import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import connectDB from './db/connection';
import songRoute from './routers/song-route'
import userRoute from './routers/user-route'
const app: Application = express();

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
    await connectDB('mongodb+srv://abrhamzewdu2119:Md12345678,@cluster0.umpmxm8.mongodb.net/?retryWrites=true&w=majority')
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
    
  } catch (error) {
    console.log(error);
    
  }
}

start()
