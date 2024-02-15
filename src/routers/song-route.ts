import express, { Router } from 'express';
import SongsController from '../controllers/song-controller'
const router: Router = express.Router();

router.get('/', SongsController.getAllSongs);
router.post('/', SongsController.addSong);
router.put('/:id', SongsController.updateSong);
router.delete('/:id', SongsController.deleteSong);
router.get('/stat',SongsController.generateStatistics)
router.patch('/:id/toggle-favorite',SongsController.toggleFavorite)
export default router;