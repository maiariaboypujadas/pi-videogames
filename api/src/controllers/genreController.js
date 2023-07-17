const axios = require ('axios');
require ("dotenv").config();
const {API_KEY} = process.env;
const { Genre } = require('../db');

// OK NO TOCAR 
const searchGenre = async () => {
    try {
      const resultDB = await Genre.findAll({ attributes: ['name'] });
      const resultAPi = await axios.get(`https://api.rawg.io/api/genres?key=7ec4d410b20b453189a41dce23b83c6b`);
      const result = resultAPi.data.results.map((g) => {
        return g.name;
      });
      // result.flat().forEach(async(element) => {
      //   await Genre.findOrCreate({ where: { name: element } });
      // });
      const allGenre = resultDB.map((g) => g.name).concat(result);
      return allGenre;
    } catch (error) {
      throw new Error('Genero no encontrado');
    }
  };

module.exports = {searchGenre}