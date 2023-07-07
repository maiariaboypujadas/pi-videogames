const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const gameRout = require ('../routes/gameRout');
const { genreRout } = require('./genresRout');


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', gameRout);
router.use('/genres', genreRout )



module.exports = router;
