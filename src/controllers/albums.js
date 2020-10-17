const { Album, Artist } = require('../models/index.js');

// exports.createAlbum = (req, res) => {
//   Album.create(req.body).then(album => res.status(201).json(album));
// };

exports.createAlbum = (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  Artist.findByPk(id).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      Album.create(req.body).then(album => {album.setArtist(id).then()
        res.status(201).json(album)});
    }
  })
  
};















