
const axios = require ('axios');
const { Videogame, Genre } = require('../db'); 
const { Op } = require('sequelize');


const getVideogamesApi = async (req, res) => {
   try {
      let games = [];
      for (let i=0; i < 5; i++){ 
     const response = await axios.get('https://api.rawg.io/api/games?key=7ec4d410b20b453189a41dce23b83c6b');
     const results = response.data.results.map((game) => {
       return {
         id: game.id,
         name: game.name,
         description: game.description,
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
  
   const searchByName = async (name) => {
    let results = [];
    try {
      const dbResults = await Videogame.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        include: {
          model: Genre,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });
  
      dbGames = dbResults.map((game) => ({
        id: game.id,
        name: game.name,
        description: game.description,
        image: game.image,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms,
        genres: game.genres,
      }));
   
        const apiResponse = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=7ec4d410b20b453189a41dce23b83c6b`);
        const apiData = apiResponse.data;
        const apiResults = apiData.results.map((game) => ({
          id: game.id,
          name: game.name,
          description: game.description_raw,
          image: game.background_image,
          released: game.released,
          rating: game.rating,
          platforms: game.platforms.map((platform) => platform.platform.name),
          genres: game.genres.map((genre) => genre.name),
        }));
  
        results = [...dbResults, ...apiResults]
      } catch (error) {
        console.error("Error searching in API:", error);
      }
  
    return results.slice(0, 15);
  };


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
              genres: game.data.genres.map((gen) => gen.name ),
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


const createGame = async (name, description, image, released, rating, platforms, genres) => {
  console.log(genres);
  try {
      const newGame = await Videogame.create({name, description, image, released, rating, platforms, genres});
    
      return newGame;
  } catch (error) {
      throw new Error('Could not create the game');
  }
};


   module.exports = { getVideogamesApi, searchID, createGame, getVideogamesDB, searchByName}; 


 
