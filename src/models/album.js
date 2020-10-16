const { Artist } = require(".");

module.exports = (connection, DataTypes) => {
    const schema = {
      // foreignkey: DataTypes.INTEGER,
      name: DataTypes.STRING,
      year: DataTypes.INTEGER,
      artistId: {
        type: DataTypes.INTEGER,
          model: Artist,
          key: 'id'
      }
    };
  
    const AlbumModel = connection.define('Album', schema);
    return AlbumModel;
  };