const { Router } = require("express");
const axios = require("axios");
const { API_KEY } = process.env; 
const {Videogame, Genre} = require('../db');
const {getVideogamesApi, getVideogamesDB, searchID, searchName, createGame} = require ('../controllers/gamesController');
const { where } = require("sequelize");
const { searchGenre } = require("../controllers/genreController");

// const router = Router();
// FUNCIONA BIEN NO TOCAR
//  const getVideogamesHandler = async (req, res) => {
//     try {
//         const infoApi = await getVideogamesApi();
//         const infoDB = await getVideogamesDB();
//         const videogames = infoDB.length > 0 ? infoDB : infoApi;
//         res.status(200).json(videogames);
//      } catch (error){
//         //console.log('No se encontró información en la API o en la base de datos', error);
//         res.status(500).json({ message: 'Error al obtener la lista de videojuegos' });
//      }
//   }

// // HANDLER DE NAME 
// const getName = async (req, res) => {
//   const { name } = req.query;
//   try {
//     if (name){
//       const result = await searchName(name);
//       res.status(200).json(result);
//     }
//     const result = await searchName();
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
//}
const getVideogamesHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const infoApi = await getVideogamesApi();
    const infoDB = await getVideogamesDB();
    const videogames = infoDB.length > 0 ? infoDB : infoApi;
    if (name) {
      const filteredVideogames = await searchName(name);
      res.status(200).json(filteredVideogames);
    } else {
      res.status(200).json(videogames);
    }
  } catch (error) {
    res.status(500).json({error: error.message });
  }
};

// FUNCIONA BIEN NO TOCAR 
     const getID = async (req, res) => {
       const {id} = req.params;
       const source = isNaN(id) ? 'BD' : 'API';
       try {
     const game = await searchID(id, source);
     res.status(200).json(game);
       } catch (error) {
         res.status(400).json({error: error.message})
       }
     }
     // -------------------
//----FUNCIONA BIEN!!! -----

const postName = async (req, res) => {
  const {name, description, image, released, rating, platform} = req.body;
  try {
const newGame = await createGame(name, description, image, released, rating, platform);
res.status(200).json({newGame, message: 'Videojuego creado con exito'})
  } catch (error) {
res.status(400).json({error: error.message})
  }
}
 //FUNCIONA OK, ES PARA TRAER LOS GENEROS
const getGenre = async (req, res) => {
  try {
    const genre = await searchGenre();
    res.status(200).json(genre)
  } catch (error) {
    res.status(400).send({error: error.message})
  }
}

    module.exports = {getVideogamesHandler ,getID, postName, getGenre};