const {Router} = require ('express');
const {getVideogamesHandler,getID, postGame} = require ('../handlers/videogamesHandler');
const gameRouter = Router();


 gameRouter.get('/', getVideogamesHandler);
 gameRouter.get('/:id', getID);
 

 gameRouter.post('/', postGame);

module.exports = gameRouter;