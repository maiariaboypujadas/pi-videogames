const {Router} = require ('express');
const {getVideogamesHandler,getID, postGame} = require ('../handlers/videogamesHandler');
//const { getVideogamesByName } = require('../controllers/gamesController');
const gameRouter = Router();


 gameRouter.get('/', getVideogamesHandler);
 gameRouter.get('/:id', getID);
 

 gameRouter.post('/', postGame);

module.exports = gameRouter;