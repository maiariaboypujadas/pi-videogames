const axios = require ('axios');
const { Genre } = require('../db');


const searchGenre = async () => {
  try {
    const resultAPi = await axios.get(`https://api.rawg.io/api/genres?key=7ec4d410b20b453189a41dce23b83c6b`);
    const result = resultAPi.data.results.map((g) => {
      return { name: g.name };
    });

    const allGenre = [];
    for (const genre of result) {
      const [dbGenre, created] = await Genre.findOrCreate({
        where: { name: genre.name },
        defaults: genre
      });
      allGenre.push(dbGenre.toJSON());
    }

    return allGenre;
  } catch (error) {
    throw new Error('Genres not found');
  }
};

module.exports = { searchGenre };














































