import { model, Schema, Document } from 'mongoose';
import joi from 'joi';

const userProfileSchema = new Schema({
  userName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 96,
  },
  name: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 96,
  },
  age: {
    type: Number,
    required: false,
    default: null,
  },
  country: {
    type: String,
    required: false,
    default: null,
  },
  personality: {
    type: String,
    required: false,
    default: null,
  },
  gameProfiles: {
    type: Array<String>,
    required: false,
    default: [],
  },
  avatar: {
    type: String,
    default: 'https://www.kindpng.com/picc/m/421-4212275_transparent-default-avatar-png-avatar-img-png-download.png',
  },
  //userid
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

interface userProfile extends Document {
  userName: string;
  name: string | null;
  age: number | null;
  country: string | null;
  personality: string | null;
  gameProfile: string[];
  lastLogin: Date;
  createdAt: Date;
}

const userProfile = model<userProfile>('userProfile', userProfileSchema, 'userProfiles');

function validateUserProfile(body: object) {
  const schema = joi.object({
    userName: joi.string().required(),
    name: joi.string(),
    age: joi.number().min(6).max(99),
    country: joi.string(),
    personality: joi.string(),
    gameProfile: joi.array(),
  });
  return schema.validate(body);
}

export { userProfile, validateUserProfile };
