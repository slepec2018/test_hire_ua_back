import { RequestHandler } from 'express';
import User from '../models/user';
import { sendError } from '../utils/helper';

export const create: RequestHandler = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, address, zipCode } = req.body;

  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return sendError(res, 'A user with the given email already exists. Check your mailbox.');
  }

  const newUser = new User({ firstName, lastName, email, phoneNumber, address, zipCode });
  await newUser.save();

  res.status(201).json({message: "Congratulations on creating your account. Check your email for further steps."});
};