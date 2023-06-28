import Games from '../../../Models/games.js';

async function updateGameDB(name: string) {
  const game = await new Games({ name: name }).save();
}

export default updateGameDB;
