//initial eviroment setting, import the .env key into the keys.js file the import it here
require("dotenv").config();
var fs = require("fs"); // added file system for log and other debugging purpose
var keys = require("./keys.js");  // need to assign the value to keys

// first filter out the process.argv[2] as action what to do
var action = process.argv[2]
switch (action){
    case "movie-this": goMovie(); break;
    case "spotify-this-song": goMusic();break;
    case "my-tweets": goTwitter();break;
    case "do-what-it-says":break;
}

// define a function to concatenate string as one variable
function getName(){
    var name;
    for(var i = 3; i< process.argv.length; i++){
        if(i ==  3) name = process.argv[i];
        else name += "+"+ process.argv[i];
    }
    return name;
}

// movie query call
function goMovie (){

    var movieRequest = require("request");
    // // Grab or assemble the movie name and store it in a variable called "movieName"
    var movieName = "";
    // ...
    movieName = getName();
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
function goMusic(){
    var Spotify = require('node-spotify-api');
    
    var spotify = new Spotify(keys.spotify);
    var songName = getName();
    //above equals below
    // var spotify = new Spotify({
    //     id: <your spotify client id>,
    //     secret: <your spotify client secret>
    // });
    
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        else {
            console.log(JSON.stringify(data,null,2)); // print out whole returned obj
            fs.appendFile("templog.txt",JSON.stringify(data,null,2),function(err){
                if(err) console.log(err);
            })
        }
    });
}

// twitter query call app usuage 
function goTwitter(){
    var Twitter = require('twitter');
    var lilTwitter = new Twitter(keys.twitter);
    
    // var client = new Twitter({
    //   consumer_key: '',
    //   consumer_secret: '',
    //   access_token_key: '',
    //   access_token_secret: ''
    // });
    var twitterAcc = getName();
    var params = {screen_name: twitterAcc};
    lilTwitter.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error&&response.statusCode ===200) {
            console.log(JSON.stringify(tweets,null,2)); 
        }
    });
}