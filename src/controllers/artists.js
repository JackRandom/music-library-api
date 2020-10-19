const { Artist } = require('../models/index.js');

exports.create = (req, res) => {
  Artist.create(req.body).then(artist => res.status(201).json(artist));
};

exports.list = (req, res) => {
    Artist.findAll({}).then(artist => res.status(200).json(artist));
  };
  

// { arstistID is the main part for the req.params from the test and its the route path you dummy!}
exports.getArtistById = (req, res) => {
  const { artistId } = req.params;
  console.log(req.params);
  Artist.findByPk(artistId).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'the artist could not be found.' });
    } else {
      res.status(200).json(artist);
    }
  })
};
exports.patchArtistById  = (req, res) => {
  const { id } = req.params;
  Artist.update(
    {genre: req.body.genre,
      name: req.body.name},
    {where: {id}}
  ).then(rowsUpdated => {
    if (!rowsUpdated) {
      res.status(404).json({ error: 'the artist could not be found.' });
    } else {
      res.status(200).json(rowsUpdated);
    }
  })
};
exports.deleteArtistById  = (req, res) => {
  const { id } = req.params;
  Artist.destroy({
    where: {id: id}
  }).then(rowsUpdated => {
    if (!rowsUpdated) {
      res.status(404).json({ error: 'the artist could not be found.' });
    } else {
      res.status(204).json(rowsUpdated);
    }
  })
};
