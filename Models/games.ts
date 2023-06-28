import { model, Schema, Document } from 'mongoose';

const gamesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ladders: {
    type: Array<String>,
    required: true,
    default: []
  },
  servers: {
    type: Array<String>,
    required: true,
    default: []
  }
});

interface Games extends Document {
  name: string;
  ladders: Array<string>;
  servers: Array<string>;
}

const Games = model<Games>('Games', gamesSchema, 'Games');

export default Games;
