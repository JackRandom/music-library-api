const artistControllers = require('./controllers/artists');
const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config()

app.post('/artists', artistControllers.create);
app.get('/artists', artistControllers.list);
app.get('/artists/:artistId', artistControllers.getArtistById);
// the :artistId part of the route is the important part of the path for this route and its controller and model
app.patch('/artists/:id', artistControllers.patchArtistById);
app.delete('/artists/:id', artistControllers.deleteArtistById);


app.get('/', (req, res) => {
    // console.log(101);
res.send("Hello World!");
  });
  

module.exports = app;