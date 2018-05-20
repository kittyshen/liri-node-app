# liri-node-app
UC Berkeley coding assignment 8

# LIRI Bot

## Overview

In this assignment, you will make LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.


### What Each Command Should Do

1. `node liri.js my-tweets`

   * This will show your last 20 tweets and when they were created at in your terminal/bash window.

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window
     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from
   * If no song is provided then your program will default to "The Sign" by Ace of Base.
   * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
   * Step One: Visit <https://developer.spotify.com/my-applications/#!/>
   * Step Two: Either login to your existing Spotify account or create a new one
   * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. 
   * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:
     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```
   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'  
     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>   
     * It's on Netflix!
   
   * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

4. `node liri.js do-what-it-says`
   
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.     
     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.    
     * Feel free to change the text in that document to test out the feature for other commands.

## Technology used
* Node.js
* javascript

## Key learning points
```javascript
//thanks for alvin's kind help, finnally set up the initial file system to go
require("dotenv").config(); //using dotenv package to encrypt api-key or other sensetive info
var fs = require("fs"); // added file system for log and other debugging purpose
var keys = require("./keys.js");  // need to assign the value to keys variable
```

```javascript
function getName(){   //define a function to concatenate process.argv[] as one string
    var name;
    for(var i = 3; i< process.argv.length; i++){
        if(i ==  3) name = process.argv[i];
        else name += "+"+ process.argv[i];
    }
    return name;
}

```

```javascript
var spotify = new Spotify(keys.spotify);
    //above equals to below after using the encrypt method hide the keys
var spotify = new Spotify({
    id: <your spotify client id>,
    secret: <your spotify client secret>
});
```

```javascript
//define a function to capture the log into string and save into a log.txt file
function log2File(string){
    fs.appendFile("log.txt",string+"\n",function(err){
        if(err) log2File(err);
    });
}
```

### Author 
[Kitty Shen ](https://github.com/kittyshen)

### [Link to Portfolio Site](https://kittyshen.github.io/Portfolio/)