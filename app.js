var express = require('express');
var request = require('request');

var app = express();

var baseUrl     = 'https://api.twitter.com/1.1/search/tweets.json';
var accessToken = 'AAAAAAAAAAAAAAAAAAAAAAGJgAAAAAAAzq%2FIAvzm%2BoAaGBsJgl3Uu%2BAW4yE%3D2FXU1BPN2qcNEEN3sMugKr1o2OsmCJVpPOFnwecp2dobNqIxHa';

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/tweets/:coords', function (req, res) {
  getTweets(req.params.coords, function (results) {
    res.send(results);
  });
});


/**
 * Get the twitter API endpoint for the specified location
 * 
 * @param  {String} - geocode string
 * @return {String} - the API Url
 */
function getAPIEndpoint (geocodeString) {
  return baseUrl + '?q=&geocode=' + encodeURI(geocodeString) + '&result_type=recent';
}

/**
 * Get tweets from twitter
 * 
 * @param  {String} coordinates
 * @param  {Function} callback
 * @return {undefined}
 */
function getTweets (coords, callback) {

  var options = {
    url: getAPIEndpoint(coords),
    headers: { 'Authorization': 'Bearer ' + accessToken }
  };

  request(options, function (error, response, body) {
    callback(body);
  });
}


/**
 * Start the server
 */
var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});