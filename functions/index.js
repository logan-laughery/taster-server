const functions = require('firebase-functions');
const request = require('request');
const url = require('url');

const debugMode = true;
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
// Set up Config 
// firebase functions:config:set taster.basebreweryurl=""
// firebase functions:config:set taster.basebeerurl=""

// Query breweries with: https://url?query=search&hitsPerPage=3&page=0
exports.breweries = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const breweryUrl = functions.config().taster.basebreweryurl;
  const queryString = url.parse(req.url).query;

  if (!queryString) {
    res.send([]);
    return;
  }

  const requestUrl = `${breweryUrl}&${queryString}`;
  console.log('Requesting Breweries From: ', requestUrl);
  request(requestUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
      return;
    }

    console.log('Request Failed: ', requestUrl);
    console.log('Error Returned: ', error);
    console.log('Status Code Returned: ', response.statusCode);

    res.status(500);
    res.send('Function failed to request breweries');
    return;
  });
});

// Query beers with: https://url?query=search
exports.beers = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const beerUrl = functions.config().taster.basebeerurl;
  const queryString = url.parse(req.url).query;

  if (!queryString) {
    res.send([]);
    return;
  }

  const requestUrl = `${beerUrl}?${queryString}`;
  console.log('Requesting Beers From: ', requestUrl);
  request(requestUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
      return;
    }

    console.log('Request Failed: ', requestUrl);
    console.log('Error Returned: ', error);
    console.log('Status Code Returned: ', response.statusCode);

    res.status(500);
    res.send('Function failed to request beers');
    return;
  });
 });
 