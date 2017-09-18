console.log("Bot active");

var weather = require('weather-js');
var twit = require('twit');
var config = require('./config');
var t = new twit(config.twitterKey);

var host = "TheWeatherRobo";
var reply = "";
//watch for tweets mentioning host name.
var stream = t.stream('statuses/filter', { track: host });

//Take tweet.
stream.on('tweet', function (tweet) {
  var sender = tweet.user.screen_name; //sender name
  var txt = tweet.text; //txt
  var regex = /@TheWeatherRobo /i; //regex expression
  var loc = txt.replace(regex, ''); //Gets location from tweet text.

  /*
    Uses location from tweet to get weather from API.
  */
  weather.find({search: loc, degreeType: 'C'}, function(err, result){
    if(err)throw err;

    var reply;
    var nameID = tweet.id_str;
    var name = tweet.user.screen_name;

    if(result[0] == undefined){
      reply = "Unfortunetly, I can't retrieve that location";
      replyTweet(reply);
    }

    else{
      //Takes important info and creates reply
      var degrees = String.fromCharCode(176) + "C"; // degress and celcius
      reply = "Location: " + result[0].location.name + "\n" +
              "Temperature: " + result[0].current.temperature + degrees + "\n" +
              "Weather: " + result[0].current.skytext + "\n";
      replyTweet(reply);
    }

    console.log(nameID +  " @" + name + "\n" + reply + "\n");

    function replyTweet(reply){
      //Creates the response tweet JSON.
      var res = {
        status: '@' + tweet.user.screen_name + " " + reply,
        in_reply_to_status_id: '' + tweet.id_str
      };
      //posts response tweetgg
      t.post('statuses/update',res);
    }
  });
});
