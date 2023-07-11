const { DataTypes, UUIDV4} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    platform: {
      type: DataTypes.STRING,

    },
    image: {
      type: DataTypes.STRING,

    },
    landingDate: {
      type: DataTypes.DATEONLY,

    },
    rating: {
      type: DataTypes.INTEGER,

    }
  },
  {
    timestamps: false,
  }
  );
};