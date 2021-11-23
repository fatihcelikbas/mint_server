// Run this script from the top level of the project

require('dotenv').config();
const key = process.env.PINATA_KEY;
const secret = process.env.PINATA_SECRET;

const fs = require('fs');
const axios = require('axios');
const path = require('path');
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(key, secret);

const basePath = process.cwd();
const imagesDir = path.join(basePath, 'knights/images');
const jsonDir = path.join(basePath, 'knights/json');
const ipfsFile = path.join(basePath, 'Knights_IPFS.json')

if (fs.existsSync(ipfsFile)) {
  fs.rmSync(ipfsFile);
}

// Upload images
const ipfsPromises =  fs.readdirSync(imagesDir).map(file => {
  const num = file.slice(0, -4);
  const fileStream = fs.createReadStream(path.join(imagesDir, file));

  let promiseResolve, promiseReject;
  const promise = new Promise(function(resolve, reject){
    promiseResolve = resolve;
    promiseReject = reject;
  });

  const options = {
    pinataMetadata: {
        name: `Knight #${num}`,
    }
  };
  pinata.pinFileToIPFS(fileStream, options).then((result) => {
      setMetadata({ id: num, cid: result.IpfsHash}, promiseResolve, promiseReject);
  }).catch((err) => {
      //handle error here
      console.log(err);
      promiseReject()
  });

  return promise
});

Promise.all(ipfsPromises).then(values => {
   writeMetaData(JSON.stringify(values, null, 2));
})


const setMetadata = (img, resolve, reject) => {
  const knight = require(path.join(jsonDir, `${img.id}.json`));
  const metadata = {
    name : `Knight #${img.id}`,
    description: knight.description,
    image: `ipfs://${img.cid}`,
    external_url: `fatihcelikbas.com/api/${img.id}`,
    attributes: knight.attributes,
  }

  const options = {
    pinataMetadata: {
        name: `Knight #${img.id} Metadata`
    }
  };

  pinata.pinJSONToIPFS(metadata, options).then(result => {
    resolve({ id: img.id, tokenURI: `ipfs://${result.IpfsHash}`})
  }).catch((err) => {
    //handle error here
    console.log(err);
    reject();
  }); 
}

const writeMetaData = (_data) => {
  fs.writeFileSync(ipfsFile, _data);
};