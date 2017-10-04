console.log("Bot active");

const weather = require('weather-js');
const twit = require('twit');
const config = require('./config');

let emojisFile = require('./emojiLib');
const emojiLib = emojisFile.emojis;


var t = new twit(config.twitterKey);//weather robot twitter obj

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
      
      let weather = result[0].current.skytext;
      let weatherEmoji;
      let weatherRegexed = weather.replace(/ /g,"_");
       
      for(emojiName in emojiLib){
        if(emojiName === weatherRegexed.toLowerCase()){
            weatherEmoji = emojiLib[emojiName].char;
            //weather = emojiLib.weatherRegexed.char;
            break;
        }
      }

      var degrees = String.fromCharCode(176) + "C"; // degress and celcius
      reply = 
      `🌎:${result[0].location.name}\n🌡️:${result[0].current.temperature}${degrees}\n${weatherEmoji}:${weather}`;
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