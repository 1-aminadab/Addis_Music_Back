import { Request, Response } from 'express';
import SongModel from '../models/song-model'

class SongsController {
  
  getAllSongs = async (req: Request, res: Response) => {
    try {
      const createdBy = req.params.username;
      let query: any = {};

      if (createdBy) {
        query.createdBy = createdBy;
      }
      const songs = await SongModel.find(query);
      res.json(songs);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  addSong = async (req: Request, res: Response) => {
  
    try {
      const newSong = new SongModel(req.body);
      const savedSong = await newSong.save();
      res.status(201).json({ message: 'Song added successfully', song: savedSong });
    } catch (error) {
      res.status(400).json({ message: 'Failed to add song' });
    }
  };

  updateSong = async (req: Request, res: Response) => {

    const id = req.params.id;
    console.log(id);
    console.log(req.body)
    
    const { title, artist, album, genre } = req.body;
    try {
      const updatedSong = await SongModel.findByIdAndUpdate(id,req.body, {new: true})
      if (!updatedSong) {
        return res.status(404).json({ message: 'Song not found' });
      }
      res.json({ message: 'Song updated successfully', song: updatedSong });
    } catch (error) {
      res.status(400).json({ message: 'Failed to update song' });
    }
  };

  deleteSong = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const deletedSong = await SongModel.findByIdAndDelete(id);
      if (!deletedSong) {
        return res.status(404).json({ message: 'Song not found' });
      }
      res.json({ message: 'Song deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Failed to delete song' });
    }
  };
  toggleFavorite = async (req: Request, res: Response) => {
    console.log("hello there ")
    try {
      const songId = req.params.id;
      console.log(songId)
      
      const song = await SongModel.findById(songId);
  
      if (!song) {
        return res.status(404).json({ message: 'Song not found' });
      }
  
      // Toggle the favorite status
      song.isFavorite = !song.isFavorite;
      await song.save();
  
      res.status(200).json({ message: 'Favorite status toggled successfully', isFavorite: song.isFavorite });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  
  generateStatistics = async (req: Request, res: Response) => {
    try {
      const createdBy = req.params.username
      let match: any = {};
      
      if (createdBy) {
        match.createdBy = createdBy;
      }

      const totalSongs = await SongModel.countDocuments(match);
      const totalArtists = (await SongModel.distinct('artist', match)).length;
      const totalAlbums = (await SongModel.distinct('album', match)).length;
      const totalGenres = (await SongModel.distinct('genre', match)).length;

      const genreCounts = await SongModel.aggregate([
        { $match: match },
        { $group: { _id: '$genre', count: { $sum: 1 } } }
      ]);

      const artistAlbumCounts = await SongModel.aggregate([
        { $match: match },
        { $group: { _id: { artist: '$artist', album: '$album' }, count: { $sum: 1 } } }
      ]);

      const albumSongCounts = await SongModel.aggregate([
        { $match: match },
        { $group: { _id: '$album', count: { $sum: 1 } } }
      ]);

      const genreSongCounts = await SongModel.aggregate([
        { $match: match },
        { $group: { _id: '$genre', count: { $sum: 1 } } }
      ]);

      const artistSongCounts = await SongModel.aggregate([
        { $match: match },
        { $group: { _id: '$artist', count: { $sum: 1 } } }
      ]);

      // Additional statistics
      const favoriteSongsCount = await SongModel.countDocuments({ ...match, isFavorite: true });

      // Return the statistics
      res.status(200).json({
        totalSongs,
        totalArtists,
        totalAlbums,
        totalGenres,
        genreCounts,
        artistAlbumCounts,
        albumSongCounts,
        genreSongCounts,
        artistSongCounts,
        favoriteSongsCount
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  }
  
export default new SongsController();
