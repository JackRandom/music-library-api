const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    // console.log(101);
return "Hello World!";
  });

module.exports = app;