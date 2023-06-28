import { model, Schema, Document } from 'mongoose';
import { HardUser, hardUserSchema } from '../Models/hardUser.js';

const sessionSchema = new Schema({
  sessionId: {
    type: String,
    required: true
  },
  user: {
    type: hardUserSchema,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

interface Session extends Document {
  sessionId: string;
  user: HardUser;
}

const Session = model<Session>('session', sessionSchema, 'sessions');

export default Session;
