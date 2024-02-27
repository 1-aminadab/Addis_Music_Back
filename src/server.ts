import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import connectDB from './db/connection';
import songRoute from './routers/song-route'
import userRoute from './routers/user-route'
const app: Application = express();
import * as dotenv from 'dotenv';
dotenv.config();
// Express Middlewares
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(express.json());

// 
app.use('/songs', songRoute);
app.use('/users', userRoute);
// Start the server
const port = process.env.PORT || 3001;
const start = async()=>{
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
    
  } catch (error) {
    console.log(error);
    
  }
}

start()
