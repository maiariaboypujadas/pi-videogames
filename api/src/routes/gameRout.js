const {Router} = require ('express');
const {getVideogamesHandler,getID, postName} = require ('../handlers/videogamesHandler');
const gameRouter = Router();


 gameRouter.get('/', getVideogamesHandler);
 gameRouter.get('/:id', getID);


 gameRouter.post('/', postName);

module.exports = gameRouter;