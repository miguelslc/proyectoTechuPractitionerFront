const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, 'build/prod')));

app.get('/*', (req,res) => {
  res.sendFile(path.resolve(__dirname, 'build/prod/index.html'));
});

app.listen(port);

console.log('Polymer desde node on: ' + port);