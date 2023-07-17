
const axios = require ('axios');
require ("dotenv").config();
//const {API_KEY} = process.env;
const { Videogame, Genre } = require('../db'); // Importa los modelos de la base de datos




// ------- GET | /videogames-----------
// ALTERNATIVA 1 SI FUNCIONA
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
//  getVideogamesApi('Limbo')
//  .then((games) => console.log(games))
//  .catch((error) => console.error(error));
// FIJARME DE CREAR BIEN LOS JUEGOS
const getVideogamesDB = async () => {
   try {
      const infoDB = await Videogame.findAll();
      return infoDB; 
   } catch (error) {
      res.status(500).send('Error DataBase', error);
   }}
// NO FUNCIONA AUN, DEVUELVE TODOS LOS JUEGOS.
// const searchName = async (name) => {
//    let games = [];
//    const api =  await axios.get(`https://api.rawg.io/api/games?search=${name}&key=7ec4d410b20b453189a41dce23b83c6b`);
//    const results = api.data.results.map((game) => {
//      return {
//        id: game.id,
//        name: game.name,
//        description: game.description_raw,
//        image: game.background_image,
//        released: game.released,
//        rating: game.rating,
//        platforms: game.platforms.map((platform) => platform.platform.name),
//        genres: game.genres.map((genre) => genre.name),
//      };
//    })
//  games.push(...results);
//    try {
 
//       const fromApi = await results();
//       const fromDB = await getVideogamesDB();
//       const resultAPIyDB = [...fromApi, ...fromDB];
//       const filterName = name ? resultAPIyDB.filter((game) => game.name.toLowerCase().includes(name.toLowerCase())) : resultAPIyDB;
//       if (filterName.length === 0) {
//         throw new Error('No se encontraron resultados');
//       }
//       return filterName.slice(0, 15);
//     } catch (error) {
//       throw new Error('Error al buscar videojuegos por nombre: ' + error.message);
//     }
// };
   
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
     res.status(500).send('Error fetching game data:', error);
   }
 
   return game.slice(0, 15);
 };
 

// FUNCIONA BIEN, NO TOCAR
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
      } else {
         return game;
      }
         } catch (error) {
            res.status(400).json('ID not found')
         }}

// FUNCIONA BIEN, NO TOCAR!!! PARA CREAR POST
const createGame = async (name, description, image, released, rating, platforms, genres) => {
   console.log(genres);
   try {
   const platform = platforms.join(', '); 
   const genre = genres.join(', ');  
   const newGame = await Videogame.create({name, description, image, released, rating, platforms, genres})
   const uniqueGenres = Array.from(new Set(genres)); // Elimina los elementos duplicados del array de géneros
   console.log(uniqueGenres);
  for (const g of uniqueGenres) {
    let [genre, created] = await Genre.findOrCreate({
      where: { name: g },
    });
    if (!created) {
      // Si el género ya existe en la base de datos, se asocia directamente al nuevo videojuego
      await newGame.addGenre(genre);
    }
  }
return newGame;
} catch (error) {
   res.status(400).send('Could not create the game')
}
}


   module.exports = { getVideogamesApi, searchID, createGame, getVideogamesDB, searchName}; 


 

   
