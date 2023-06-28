import 'dotenv/config';
import express, { Request, Response } from 'express';
import * as http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import usersRouter from './Routes/users.js';
import authRouter from './Routes/auth.js';
import profilesRouter from './Routes/profiles.js';
import gamesRouter from './Routes/games.js';
import cookies from 'cookie-parser';
import morgan from 'morgan';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const server = http.createServer(app);

mongoose.set('strictQuery', false);
mongoose
  .connect(`${process.env.ATLAS_LOGIN}`)
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((err: any) => {
    console.log(`could not connect to mongo db ${err}`);
  });

app.get('/isalive', (req: Request, res: Response) => {
  res.send('OK');
});

app.use(morgan('dev'));
app.use(express.json());
app.use(cookies());
app.use(
  cors({
    exposedHeaders: ['Set-Cookie'],
    credentials: true,
    origin: 'http://localhost:3000'
  })
);

//routers here
app.get('/test', (req: any, res: any) => {
  res.send(':D');
});

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/profiles', profilesRouter);
app.use('/api/games', gamesRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname + '../../Public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../Public/index.html'));
});

app.all('*', (req: Request, res: Response) => {
  res.status(404).send('Not Found');
});

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Listening on port ${port}`));
