const path = require('path');
const express = require('express');
const cors = require('express-cors');
const bodyParser = require('body-parser')
const request = require('request');
const port = process.env.PORT || 3001;
const app = express();

app.use(cors({
    allowedOrigins: ['localhost:3000']
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/v1/houses', function(req, res) {
  request('http://www.anapioficeandfire.com/api/houses?pageSize=50&hasTitles=true&hasSeats=true&hasAncestralWeapons=true',
    function(error, response, body) {
      if(error) {
        console.log(error);
        res.status(401).send(error);
      }
      res.status(200).send(body);
    }
  );
});

app.get('/api/v1/character/:id', function(req, res) {
  request('https://www.anapioficeandfire.com/api/characters/' + req.params.id, function(error, response, body) {
    if(error) {
      console.log(error);
      req.status(401).send(error);
    }
    res.status(200).send(body)
  });
});

app.listen(port);
