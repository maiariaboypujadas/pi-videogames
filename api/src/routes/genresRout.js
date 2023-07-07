const {Router} = require ('express');
const { getGenre } = require('../handlers/videogamesHandler');
const genreRout = Router();

genreRout.get('/', getGenre)

module.exports = {genreRout}