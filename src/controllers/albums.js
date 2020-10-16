const { Album } = require('../models/index.js');
const { Artist } = require('../models/index.js');

exports.create = (req, res) => {
    const { artistId } = req.params;
    console.log(req.params);
    Artist.findByPk(artistId).then(artist => {
      if (!artist) {
        res.status(404).json({ error: 'the artist could not be found.' });
      } else {
        res.status(200).json(artist);
      }
    })
    Album.create(req.body).then(artist => res.status(201).json(artist));
  };
//   exports.create2 = (req, res) => {
//   const { artistId } = req.params;
//   console.log(req.params);
//   Album.findByPk(artistId).then(album => {
//     if (!artist) {
//       res.status(404).json({ error: 'the artist could not be found.' });
//     } else {
//       res.status(201).json(artist);
//     }
//   })
// };