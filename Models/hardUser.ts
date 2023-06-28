import { model, Schema, Document } from 'mongoose';
import joi from 'joi';
import * as jwt from 'jsonwebtoken';
import config from 'config';

const hardUserSchema = new Schema({
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024
  },
  active: {
    type: Boolean,
    default: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  profile: {
    type: String,
    required: true
  }
});

interface HardUser extends Document {
  email: string;
  password: string;
  active: boolean;
  verified: boolean;
  lastLogin: Date;
  createdAt: Date;
  profile: string;
  generateAuthToken(): string;
}

hardUserSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this.id,
      email: this.email,
      profile: this.profile
    },
    config.get('jwtkey')
  );
};

const HardUser = model<HardUser>('HardUser', hardUserSchema, 'harduser');

function validateUser(user: object) {
  const schema = joi.object({
    email: joi.string().min(6).max(255).required().email(),
    password: joi.string().min(6).max(1024).required(),
    profile: joi.string().required()
  });
  return schema.validate(user);
}

export { HardUser, validateUser, hardUserSchema };
