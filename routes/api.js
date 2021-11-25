const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const constants = require('../constants/contract');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const Knight = require('../models/Knight');
const axios = require('axios');

const key = process.env.PINATA_KEY;
const secret = process.env.PINATA_SECRET;
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(key, secret);

const { getTokenUri } = require('../utils/interact');
const { response } = require('express');

var router = express.Router()

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://mint-server.us.auth0.com/.well-known/jwks.json'
  }),

  // Validate the audience and the issuer.
  audience: 'https://fatihcelikbas.com/api',
  issuer: 'https://mint-server.us.auth0.com/',
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
  return res.send("Not implemented");
})

router.get('/reset', (req, res) => {
  const db = mongoose.connection;
  db.dropDatabase()
  res.status(200).end()
});

router.get('/knight/:id', async (req, res) => {
  const id = req.params.id;

  // quick input handling;
  if (id == null || id < 0 || id > constants.MAX_SUPPLY) {
    return res.status(404).json({ message: "Knight not found" });
  }

  getTokenUri(id.toString())
    .then(result => {
      if (result) {        
        axios.get(`https://ipfs.io/ipfs/${result.slice(7)}`)
          .then(response => {
            return res.json(response.data);
          })
          .catch(err => {
            return res.status(500).json({ message: err.message });
          })
      }
      else {
        return res.json({});
      }

    })
    .catch(err => {
      return res.status(500).json({ message: err.message });
    });
});


router.use(checkJwt);

router.post('/add', (req, res) => {
  const knight = new Knight({ 
    num: req.body.num, 
    cid: req.body.cid
  });

  knight.save(function (err) {
    if(err) {
        return res.status(500).json({ message: err.message });
    }
    res.json({added: req.body.cid});
  }); 
});

module.exports = router