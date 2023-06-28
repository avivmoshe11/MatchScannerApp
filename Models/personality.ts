import { model, Schema, Document } from 'mongoose';
import joi from 'joi';

const personalitySchema = new Schema({
  funny: {
    type: Boolean,
    default: null,
  },
  funToPlay: {
    type: Boolean,
    default: null,
  },
  tryHard: {
    type: Boolean,
    default: null,
  },
  easilyOffended: {
    type: Boolean,
    default: null,
  },
  warm: {
    type: Boolean,
    default: null,
  },
  thoughtful: {
    type: Boolean,
    default: null,
  },
  tendToTilt: {
    type: Boolean,
    default: null,
  },
  edgy: {
    type: Boolean,
    default: null,
  },
  shy: {
    type: Boolean,
    default: null,
  },
});

interface Personality extends Document {
  funny: string | null;
  funToPlay: string | null;
  tryHard: string | null;
  easilyOffended: string | null;
  warm: string | null;
  thoughtful: string | null;
  tendToTilt: string | null;
  edgy: string | null;
  shy: string | null;
}

const Personality = model<Personality>('Personality', personalitySchema, 'personality');

function validatePersonality(body: object) {
  const schema = joi.object({
    funny: joi.boolean(),
    funToPlay: joi.boolean(),
    tryHard: joi.boolean(),
    easilyOffended: joi.boolean(),
    warm: joi.boolean(),
    thoughtful: joi.boolean(),
    tendToTilt: joi.boolean(),
    edgy: joi.boolean(),
    shy: joi.boolean(),
  });
  return schema.validate(body);
}

export { Personality, validatePersonality };
