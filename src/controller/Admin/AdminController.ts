import { Request, Response } from 'express';
import UserModel, { IUser } from '../../models/UserModel';
import bcrypt from 'bcrypt';

class AdminController {
  
  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users: IUser[] = await UserModel.find();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching users', error });
    }
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser: IUser = new UserModel({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ message: 'Error creating user', error });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email, password } = req.body; 
    try {
      const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined; 

      const updatedUser: IUser | null = await UserModel.findByIdAndUpdate(
        id, 
        { 
          name, 
          email, 
          ...(hashedPassword && { password: hashedPassword }) 
        }, 
        { new: true } 
      );

      if (!updatedUser) return res.status(404).json({ message: 'User not found' });
      return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating user', error });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const deletedUser: IUser | null = await UserModel.findByIdAndDelete(id);
      if (!deletedUser) return res.status(404).json({ message: 'User not found' });
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting user', error });
    }
  }
}

export const adminController = new AdminController();
