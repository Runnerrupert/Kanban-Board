import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// This function takes in the username & password given by the client and checks if that users information is within the database
export const login = async (req: Request, res: Response) => {
  // Information given within the post request
  const { username, password } = req.body;

  // Searches the DB using the User Model and findOne method from Sequelize to check if the username is within the database
  const user = await User.findOne({
    where: { username },
  });

  // Returns an error message if the username is incorrect
  if (!user) {
    return res.status(401).json({ message: 'Authentication Failed' });
  }

  // Variable that uses bcrypt to hash the password and check if the password the User gave is the same as the password within the database that has been hashed
  const passwordIsValid = await bcrypt.compare(password, user.password);

  // Returns an error message if the password is incorrect
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication Failed' });
  }

  // gets the JWT secret key to be used by jwt
  const secretKey = process.env.JWT_SECRET_KEY || '';

  // Creates a jwt token
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

  // Returns the jwt token
  return res.json({ token })
};

const router = Router();

// Creates a post request to login the user, so long as it is Authenticated correctly
router.post('/login', login);

export default router;