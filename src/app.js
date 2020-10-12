const artistControllers = require('./controllers/artists');
const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config()

app.post('/artists', artistControllers.create);
app.get('/artists', artistControllers.list);
app.get('/artists/:artistId', artistControllers.artistId;
// app.get('/artists/:artistId', artistControllers.getArtistById;

// app.get('/', (req, res) => {
//     // console.log(101);
// res.send("Hello World!");
//   });
  

module.exports = app;