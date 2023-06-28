import express, { Request, Response } from 'express';
import joi, { date } from 'joi';
import { HardUser } from '../Models/hardUser.js';
import { userProfile } from '../Models/userProfile.js';
import auth from '../Middleware/auth.js';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import Session from '../Models/session.js';

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  const isLogged = req.cookies['api-auth'];
  if (isLogged) return res.status(500).send({ error: 'already logged in' });

  const { error } = validateAuth(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  let user = await HardUser.findOne({ email: req.body.email.toLowerCase() });
  if (!user) {
    return res.status(400).send({ error: 'Invalid email' });
  }

  const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordValid) return res.status(400).send({ error: 'Invalid password' });

  await HardUser.findOneAndUpdate(
    {
      _id: user._id
    },
    {
      lastLogin: Date.now()
    },
    {
      new: true
    }
  );
  await userProfile.findOneAndUpdate(
    {
      _id: user.profile
    },
    {
      lastLogin: Date.now()
    },
    {
      new: true
    }
  );

  const sessionId = uuidv4();
  let session = await Session.findOne({ 'user.email': user.email });

  if (!session) {
    session = new Session({ sessionId: sessionId, user: user });
  } else {
    session.sessionId = sessionId;
  }

  await session.save();

  res.cookie('api-auth', sessionId, {
    secure: false,
    httpOnly: true,
    expires: dayjs().add(7, 'days').toDate()
  });

  res.json({ message: 'Ok' });
});

router.post('/logout', auth, async (req: Request, res: Response) => {
  res.clearCookie('api-auth');
  res.json({ message: 'Good Bye!' });
});

function validateAuth(user: object) {
  const schema = joi.object({
    email: joi.string().min(6).max(255).required().email(),
    password: joi.string().min(6).max(1024).required()
  });
  return schema.validate(user);
}

export default router;
