import express, { Request, Response } from 'express';
import { GameProfile, validateGameProfile } from '../Models/gameProfile.js';
import bcrypt from 'bcrypt';

const router = express.Router();

//createGameProfile endpoint - if valid, sets a GameProfile document into the collection
router.post('/profile', async (req: Request, res: Response) => {
  const { error } = validateGameProfile(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  await new GameProfile(req.body).save();
  res.send({ message: 'OK' });
});

export default router;
