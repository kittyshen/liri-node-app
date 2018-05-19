//initial eviroment setting, import the .env key into the keys.js file the import it here
require("dotenv").config();
require("./keys");


// first filter out the process.argv[2] as action what to do

var action = process.argv[2]
switch (action){
    case "movie-this": goMovie();
}

// movie query call
function goMovie (){

    var movieRequest = require("request");
    // // Grab or assemble the movie name and store it in a variable called "movieName"
    var movieName = "";
    // ...
    for(var i = 3; i< process.argv.length; i++){
        if(i ==  2) movieName = process.argv[i];
        else movieName += "+"+ process.argv[i];
    }
    console.log(movieName);
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    // Then create a request to the queryUrl
    // ...

    movieRequest(queryUrl ,function(err, response, data) {
        
        if (!err && response.statusCode === 200) {
            // console.log(JSON.parse(body,null,2));
            console.log("-----------------")
            console.log("This movie's name is: " + JSON.parse(data).Title);
            console.log("The movie's year is: " + JSON.parse(data).Year);
            console.log("The movie's rating is: " + JSON.parse(data).imdbRating);
            console.log("The movie's Rotten Tomatoes Rating is: " + JSON.parse(data).Ratings.Value);
            console.log("Country where the moview was produced: " + JSON.parse(data).Country);
            console.log("Language of the movie: " + JSON.parse(data).Language);
            console.log("Plot of the movie: " + JSON.parse(data).Plot);
            console.log("The movie's Actors are: " + JSON.parse(data).Actors);
            
        }
    });
}

// spotify query call app usuage  
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify(keys.spotify);
// var spotify = new Spotify({
//     id: <your spotify client id>,
//     secret: <your spotify client secret>
// });
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});


// twitter query call app usuage 
var Twitter = require('twitter');
var lilTwitter = new Twitter(keys.twitter);
 
// var client = new Twitter({
//   consumer_key: '',
//   consumer_secret: '',
//   access_token_key: '',
//   access_token_secret: ''
// });
 
var params = {screen_name: 'nodejs'};
lilTwitter.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});