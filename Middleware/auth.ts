import { NextFunction, Request, Response } from 'express';
import Session from '../Models/session.js';

async function auth(req: any, res: Response, next: NextFunction) {
  const sessionId = req.cookies['api-auth'];
  if (!sessionId) return res.status(401).send({ error: 'Access denied, no session provided' });

  let session = await Session.findOne({ sessionId: sessionId }); //TODO: use redis in the future.
  if (session) {
    req.user = session.user;
    next();
  } else return res.status(401).send({ error: 'Invalid session id' });
}

export default auth;
