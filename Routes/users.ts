import express, { Request, Response } from 'express';
import { HardUser, validateUser } from '../Models/hardUser.js';
import bcrypt from 'bcrypt';
import auth from '../Middleware/auth.js';

const router = express.Router();

//createUser endpoint - if valid, sets a new HardUser document into the collection
router.post('/', async (req: Request, res: Response) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  let user = await HardUser.findOne({ email: req.body.email.toLowerCase() });
  if (user) return res.status(400).send({ error: 'Email already registered' });

  user = new HardUser(req.body);
  user.email = user.email.toLowerCase();
  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send({ message: 'OK' });
});

router.get('/', auth, async (req: any, res: Response) => {
  res.send({ email: req.user.email, _id: req.user._id, profile: req.user.profile });
});

export default router;
