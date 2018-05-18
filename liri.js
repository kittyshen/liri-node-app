

// first filter out the process.argv[2] as action what to do

var action = process.argv[2]
switch (action){
    case "movie-this": goMovie();
}

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