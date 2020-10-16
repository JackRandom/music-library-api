module.exports = (connection, DataTypes) => {
    const schema = {
      foreignKey: 'artistId',
      name: DataTypes.STRING,
      year: DataTypes.INTEGER,
    };
  
    const AlbumModel = connection.define('Album', schema);
    return AlbumModel;
  };