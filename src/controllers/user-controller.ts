import { Request, Response} from 'express';
import UserModel from  '../models/user-model'; 

class UserController {
  signup = async(req: Request, res: Response)=> {
    const { username } = req.body;
    console.log("user name",username);
    try {
      const existingUser = await UserModel.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      const newUser = await UserModel.create({ username });
      return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  login = async(req: Request, res: Response) => {
    const { username } = req.body;

    try {
      const user = await UserModel.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ message: 'User logged in successfully', user });
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new UserController();
