import { model, Schema, Document } from 'mongoose';
import joi from 'joi';

const gameProfileSchema = new Schema({
  inGameName: {
    type: String,
    required: true,
  },
  game: {
    type: String,
    required: true,
  },
});

interface GameProfile extends Document {
  inGameName: string;
  game: string;
}

const GameProfile = model<GameProfile>('GameProfile', gameProfileSchema, 'GameProfile');

function validateGameProfile(body: object) {
  const schema = joi.object({
    inGameName: joi.string().required(),
    game: joi.string().required(),
  });
  return schema.validate(body);
}

export { GameProfile, validateGameProfile };
