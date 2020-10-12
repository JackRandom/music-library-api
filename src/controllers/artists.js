const { Artist } = require('../models/index.js');

exports.create = (req, res) => {
  Artist.create(req.body).then(artist => res.status(201).json(artist));
};
//the below is on the right track you need to fix the syntax and structure (req, res) isnt right
exports.list = (req, res) => {
    Artist.findAll({}).then(artist => res.status(200).json(artist));
  };
  
exports.artistId = (req, res) => {
    console.log(req);
    Artist.findByPk({where: {id:{}}}).then(artist => res.status(200).json(artist));
  };

// exports.getArtistById = (req, res) => {
//   const { id } = req.params;
//   Artist.findByPk(id).then(artist => {
//     if (!artist) {
//       res.status(404).json({ error: 'The artist could not be found.' });
//     } else {
//       res.status(200).json(artist);
//     }
//   })
// };