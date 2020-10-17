const { Album, Artist } = require('../models/index.js');

exports.createAlbum = (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  Artist.findByPk(id).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      Album.create(req.body).then(album => {
        album.setArtist(id).then(linkedAlbum => {
          res.status(201).json(linkedAlbum);
        });
      });
    };
  });
};

exports.albumList = (req, res) => {
  Album.findAll({}).then(album => res.status(200).json(album));
};

exports.getAlbumById = (req, res) => {
  const { albumId } = req.params;
  console.log(req.params);
  Album.findByPk(albumId).then(album => {
    if (!album) {
      res.status(404).json({ error: 'the album could not be found.' });
    } else {
      res.status(200).json(album);
    }
  })
};
