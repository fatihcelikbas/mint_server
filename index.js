require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const mongoose = require("mongoose");
const Knight = require('./models/Knight');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); 
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("Connection to db established"));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-bepfwwd0.us.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'https://server.fatihcelikbas.com',
  issuer: `https://dev-bepfwwd0.us.auth0.com/`,
  algorithms: ['RS256']
});

const PORT = process.env.PORT || 5000
const app = express();

app.use(helmet());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

app.use(morgan('combined'));

app.get('/', async (req, res) => {
  try {
    const knights = await Knight.find()
    res.json(knights)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

app.post('/mint', async (req, res) => {
  let knight;
  try {
    knight = await Knight.findOne({isMinted: false});
    if (knight == null) {
      return res.status(404).json({ message: "All minted" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  knight.isMinted = true;
  knight.save(function (err) {
    if(err) {
        return res.status(500).json({ message: err.message });
    }
  });

  res.json({ minted: knight.cid});
})

app.get('/:id', async (req, res) => {
  let knight;
  try {
    knight = await Knight.findOne({cid: req.params.id.toString()});
    if (knight == null || !knight.isMinted) {
      return res.status(404).json({ message: "Cannot find Knight" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.json(knight);
});

app.use(checkJwt);

app.post('/add', (req, res) => {
  const knight = new Knight({ 
    name: req.body.name, 
    description: req.body.description,
    image: req.body.image, 
    attributes: req.body.attributes, 
    cid: req.body.id});

  knight.save(function (err) {
    if(err) {
        return res.status(500).json({ message: err.message });
    }
  });

  res.json({added: req.body.id});
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
});