const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const Knight = require('../models/Knight');

var router = express.Router()

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

router.use(helmet());
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.get('/', async (req, res) => {
  try {
    const knights = await Knight.find()
    res.json(knights)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

router.post('/mint', async (req, res) => {
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

router.get('/:id', async (req, res) => {
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

router.use(checkJwt);

router.post('/add', (req, res) => {
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

module.exports = router