const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.breweries = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.beers = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
 });
