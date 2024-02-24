import mongoose, {Document, Schema} from 'mongoose';

export interface User extends Document {
    username:string;
}

const userSchema = new Schema({
    username: { type: String, required: true },
    
  });
  export default mongoose.model<User>('User', userSchema);