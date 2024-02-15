import mongoose from 'mongoose';

const connectDB = (uri: any): Promise<typeof mongoose> => {
  mongoose.set('strictQuery', false);
  return mongoose
    .connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    })
    .then(() => {
      console.log('CONNECTED TO DB');
      return mongoose;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export default connectDB;