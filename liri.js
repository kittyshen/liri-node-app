//initial eviroment setting, import the .env key into the keys.js file the import it here
require("dotenv").config();
var fs = require("fs"); // added file system for log and other debugging purpose
var keys = require("./keys.js");  // need to assign the value to keys

var getname;
for(var i = 3; i< process.argv.length; i++){
    if(i ==  3) getname = process.argv[i];
    else getname += " "+ process.argv[i];
}
log2File("----------***** new command here ******----------");
log2File(process.argv[2]+","+getname);        //log the input command

// first filter out the process.argv[2] as action what to do
var action = process.argv[2]
function whatTodo(action,string){
    switch (action){
        case "movie-this": goMovie(string); break;
        case "spotify-this-song": goMusic(string);break;
        case "my-tweets": goTwitter(string); break;
        case "do-what-it-says":doWhatever(); break;
    }
}
whatTodo(action);


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
function goMovie (string){
    var movieRequest = require("request");
    var movieName = ""; 
    if(string == null){
        movieName = getName();  // Grab or assemble the movie name and store it in a variable called "movieName"
    }
    else movieName = string;
    // log2File(movieName);
    if (movieName == null){
        movieName = "Mr. Nobody";
    }
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    // log2File(queryUrl);

    // Then create a request to the queryUrl
    // ...

    movieRequest(queryUrl ,function(err, response, data) {
        
        if (!err && response.statusCode === 200) {
            // log2File(data);
            // log2File(JSON.parse(data,null,2));
            console.log("-----------------")
            console.log("This movie's name is: " + JSON.parse(data).Title);
            console.log("The movie's year is: " + JSON.parse(data).Year);
            console.log("The movie's rating is: " + JSON.parse(data).imdbRating);
            console.log("The movie's Rotten Tomatoes Rating is: " + JSON.parse(data).Ratings.Value);
            console.log("Country where the moview was produced: " + JSON.parse(data).Country);
            console.log("Language of the movie: " + JSON.parse(data).Language);
            console.log("Plot of the movie: " + JSON.parse(data).Plot);
            console.log("The movie's Actors are: " + JSON.parse(data).Actors);
            log2File("-------------------------------------------------");
            log2File("This movie's name is: " + JSON.parse(data).Title);
            log2File("The movie's year is: " + JSON.parse(data).Year);
            log2File("The movie's rating is: " + JSON.parse(data).imdbRating);
            log2File("The movie's Rotten Tomatoes Rating is: " + JSON.parse(data).Ratings.Value);
            log2File("Country where the moview was produced: " + JSON.parse(data).Country);
            log2File("Language of the movie: " + JSON.parse(data).Language);
            log2File("Plot of the movie: " + JSON.parse(data).Plot);
            log2File("The movie's Actors are: " + JSON.parse(data).Actors);
            if (JSON.parse(data).Title == "Mr. Nobody")
            {
                console.log("If you haven't watched \"Mr. Nobody,\" then you should: http://www.imdb.com/title/tt0485947/");
                console.log("It's on Netflix!") ;
             log2File("If you haven't watched \"Mr. Nobody,\" then you should: http://www.imdb.com/title/tt0485947/");
             log2File("It's on Netflix!") ;
            }
            
        }
    });
}

// spotify query call app usuage  
function goMusic(string){
    var Spotify = require('node-spotify-api');
    var songName = "";
    // log2File(string);
    if(string == null){
        songName = getName(); // extract song name out of process.argv and store in songname variable
    }
    else songName = string; // if there are variable get carried over when call the function using that value
    
    var spotify = new Spotify(keys.spotify);
    //above equals to below

    // var spotify = new Spotify({
    //     id: <your spotify client id>,
    //     secret: <your spotify client secret>
    // });
    if (songName == null){
        songName = "The Sign Ace of Base";
    }
    
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            return log2File('Error occurred: ' + err);
        }
        else {  //print out  the song's info
            // log2File(JSON.stringify(data,null,2)); // print out whole returned obj
            // fs.appendFile("templog.txt",JSON.stringify(data,null,2),function(err){
            // if(err) log2File(err);
            // });
            console.log("-------------------------------------------------");
            console.log("Song name:" + data.tracks.items[0].name);  // limit to the first song            
            console.log("Artist name:" + data.tracks.items[0].artists[0].name);  // limit to the first song
            console.log("Song preview:" + data.tracks.items[0].external_urls.spotify);  // limit to the first song
            console.log("Album:" + data.tracks.items[0].album.name);  // limit to the first song
            console.log("Release date: " + data.tracks.items[0].album.release_date);  // limit to the first song
            log2File("-------------------------------------------------");
            log2File("Song name:" + data.tracks.items[0].name);  // limit to the first song            
            log2File("Artist name:" + data.tracks.items[0].artists[0].name);  // limit to the first song
            log2File("Song preview:" + data.tracks.items[0].external_urls.spotify);  // limit to the first song
            log2File("Album:" + data.tracks.items[0].album.name);  // limit to the first song
            log2File("Release date: " + data.tracks.items[0].album.release_date);  // limit to the first song
        }
    });
}

// twitter query call app usuage 
function goTwitter(string){
    var Twitter = require('twitter');
    var lilTwitter = new Twitter(keys.twitter);
    
    // var client = new Twitter({
    //   consumer_key: '',
    //   consumer_secret: '',
    //   access_token_key: '',
    //   access_token_secret: ''
    // });
    var twitterAcc;
    if(string == null){
        twitterAcc = getName();
    }
    else twitterAcc = string;

    var params = {screen_name: twitterAcc};
    lilTwitter.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error&&response.statusCode ===200) {
            log2File("-------------------------------------------------");
            console.log("-------------------------------------------------");

            // log2File(JSON.stringify(tweets,null,2)); 
            // fs.appendFile("templog.txt",JSON.stringify(tweets,null,2),function(err){
            //     if(err) log2File(err);
            // });
            //printing the tweets array obj
            for(var i =0 ;i <(tweets.length<20? tweets.length:20);i++){  // get less than 10 entry back 
                console.log(tweets[i].user.name +" says : " +tweets[i].text);
                
                log2File(tweets[i].user.name +" says : " +tweets[i].text);
            }
        }
    });
}

function doWhatever(){
    fs.readFile("random.txt","utf8",function(err,data){
        if(err) log2File(err);
        // log2File(data);
        // Then split it by comma (to make it more readable)
        var dataAllArr = data.split("\n");
        var index = Math.floor(Math.random()*dataAllArr.length); //random pick one action to do
        var dataArr = dataAllArr[index].split(","); 
        // log2File(dataArr);
        var action = dataArr[0];
        var name = dataArr[1];
        whatTodo(action,name);
        // return data;
    });
}

//*************************/
//bonus capture the log activity
//https://stackoverflow.com/questions/9609393/catching-console-log-in-node-js?answertab=active#tab-top

// console.log = function() {};
// var modLog2File = require("./module.js");
// modLog2File();
function log2File(string){
    fs.appendFile("log.txt",string+"\n",function(err){
        if(err) log2File(err);
    });
}
