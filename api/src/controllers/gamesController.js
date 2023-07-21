
const axios = require ('axios');
require ("dotenv").config();
//const {API_KEY} = process.env;
const { Videogame, Genre } = require('../db'); // Importa los modelos de la base de datos
const { Op } = require('sequelize');




// ------- GET | /videogames-----------
const getVideogamesApi = async (req, res) => {
   try {
      let games = [];
      for (let i=0; i < 5; i++){ // traigo 100 juegos
     const response = await axios.get('https://api.rawg.io/api/games?key=7ec4d410b20b453189a41dce23b83c6b');
     const results = response.data.results.map((game) => {
       return {
         id: game.id,
         name: game.name,
         description: game.description_raw,
         image: game.background_image,
         released: game.released,
         rating: game.rating,
         platforms: game.platforms.map((platform) => platform.platform.name),
         genres: game.genres.map((genre) => genre.name),
       };
     })
   games.push(...results);
}
return games;
 } catch (error) {
     res.status(500).send('Videojuego not found', error);
 }}

const getVideogamesDB = async () => {
   try {
      const infoDB = await Videogame.findAll({
        include: {
          model: Genre,
          attributes: ["name"],
          through: {attributes: []}
        }
      });
      return infoDB; 
   } catch (error) {
      res.status(500).send('Error DataBase', error);
   }}

const searchName = async (name) => {
   let game = [];
   try {
      const response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=7ec4d410b20b453189a41dce23b83c6b`);
     const results = response.data.results;
 
     results.forEach((games) => {
       const gameObj = {
         id: games.id,
         name: games.name,
         description: games.description_raw,
         image: games.background_image,
         released: games.released,
         rating: games.rating,
         platforms: games.platforms.map((platform) => platform.platform.name),
         genres: games.genres.map((genre) => genre.name),
       };
       if (gameObj.name.toLowerCase().includes(name.toLowerCase()))
       {
          game.push(gameObj);

       } 
     });
   } catch (error) {
     res.status(500).send('Videogame not found:', error);
   }
 
   return game.slice(0, 15);
 };
 // --------- BUSCAR POR NOMBRE BASE DE DATOS ----------------
 const searchNameDB = async (name) => {
  let game = [];
  let dbGames = await Videogame.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
    include: {
      model: Genre,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  if (dbGames.length === 0) {
    dbGames = [];
  }

  dbGames.forEach((games) => {
    const gameSearch = {
      id: games.id,
      name: games.name,
      description: games.description,
      image: games.image,
      released: games.released,
      rating: games.rating,
      platforms: games.platforms.map((platform) => platform.name),
      genres: games.genres.map((genre) => genre.name),
    };
    if (gameSearch.name.toLowerCase().includes(name.toLowerCase())) {
      game.push(gameSearch);
    }
  });

  if (dbGames.length === 0) {
    game = await searchName(name);
  }

  return game.slice(0, 15);
}

// -----------------BUSCAR POR ID --------------------------------
const searchID = async (id, source) => {
   try {
   const game = 
   source === 'API'
   ? await axios.get(
      `https://api.rawg.io/api/games/${id}?key=7ec4d410b20b453189a41dce23b83c6b`
    )
    : await Videogame.findByPk(id, { include: Genre });

    if(source === 'API') {
      return {
              id: game.data.id,
              name: game.data.name,
              description: game.data.description_raw,
              image: game.data.background_image,
              released: game.data.released,
              genres: game.data.genres.map((gen) => {
                return { id: gen.id, name: gen.name };
              }),
              rating: game.data.rating,
              platforms: game.data.platforms.map((el) => el.platform.name),
            };
      } else if (game){
         return game;
      } else {
        throw new Error('ID not found');
      }
         } catch (error) {
          throw new Error('Could not search for the game');
         }}

// ------------ PARA CREAR POST -----------------
const createGame = async (name, description, image, released, rating, platforms, genres) => {
  console.log(genres);
  try {
      const newGame = await Videogame.create({name, description, image, released, rating, platforms, genres});
    
      return newGame;
  } catch (error) {
      throw new Error('Could not create the game');
  }
};


   module.exports = { getVideogamesApi, searchID, createGame, getVideogamesDB, searchNameDB}; 


 
