import express, { Request, Response } from 'express';
import { Personality, validatePersonality } from '../Models/personality.js';
import { userProfile, validateUserProfile } from '../Models/userProfile.js';
import index from '../Assets/functions/index.js';

const router = express.Router();

//personality endpoint - if valid, sets a new personality document into the collection
router.post('/personality', async (req: Request, res: Response) => {
  const { error } = validatePersonality(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  await new Personality(req.body).save();
  res.send({ message: 'OK' });
});

router.post('/profile', async (req: Request, res: Response) => {
  const { error } = validateUserProfile(req.body);
  if (error) return res.status(400).send({ error: error.details[0] });

  let profile = await userProfile.findOne({ userName: req.body.userName });
  if (profile) return res.status(400).send({ error: 'Username already taken.' });

  profile = new userProfile(req.body);
  if (profile.country) profile.country = profile.country.toLowerCase();
  await profile.save();
  res.send({ message: 'OK', profile: { id: profile._id } });
});

router.get('/profile/:id', async (req: Request, res: Response) => {
  const profileId = req.params.id;

  const profile = await userProfile.findOne({ _id: profileId });
  if (!profile) return res.status(500).send({ error: 'Internal server error.' });
  res.send({ message: 'OK', profile: profile });
});

export default router;
