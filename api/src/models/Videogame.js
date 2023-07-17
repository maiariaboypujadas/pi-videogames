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
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
  
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    released: {
      type: DataTypes.DATEONLY,
     // allowNull: false,

    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genres: {
      type: DataTypes.ARRAY(DataTypes.STRING),
  
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  }
  );
};

