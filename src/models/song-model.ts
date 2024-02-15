import mongoose, { Document, Schema } from 'mongoose';

export interface Song extends Document {
  createdBy:string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  isFavorite:boolean;
}

const songSchema = new Schema({
  createdBy: { type: String, required: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  genre: { type: String, required: true },
  isFavorite:{type:Boolean, requered:true,default:false}
});

export default mongoose.model<Song>('Song', songSchema);
