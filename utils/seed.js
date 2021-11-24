require('dotenv').config();
const path = require('path');
const axios = require('axios');

const basePath = process.cwd();
const inputFile = 'Knights_IPFS.json';
const knights = require(path.join(basePath, inputFile));

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${process.env.BEARER_TOKEN}`
}

knights.forEach(knight => {
  axios.post('http://localhost:5000/api/add', 
  {
    num: knight.id,
    id: knight.tokenURI.slice(7)
  },
  {
    headers: headers
  }).then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
});


