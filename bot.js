console.log("Bot active");

const weather = require('weather-js'); //require weather api
const twit = require('twit'); //require twitter api
const config = require('./config');

let emojisFile = require('./emojiLib'); //retrieve content from emojiLib file
const emojiLib = emojisFile.emojis; //retrieve emojis

var t = new twit(config.twitterKey);//weather robot twitter obj

var host = "TheWeatherRobo"; //Twitter @ name.

//initiate watch for tweets mentioning host name.
var stream = t.stream('statuses/filter', { track: host });

//When tweet mentions host.
stream.on('tweet', function (tweet) {

  var txt = tweet.text; //tweet text
  var regex = /@TheWeatherRobo /i; //regex remove host name from tweet
  var loc = txt.replace(regex, ''); //removes host name from tweet to leave with location
  var reply; //initate reply
  var nameID = tweet.id_str; //get the twitter ID of sender
  var name = tweet.user.screen_name; //gets the twitter screen name of sender

  /*
    Uses location from tweet to get weather from API. Automatically sets to celcius since
    celcius is life.
  */
  weather.find({search: loc, degreeType: 'C'}, function(err, result){
    if(err)throw err;

    if(result[0] == undefined){ //if location does not exist or MSN weather cannot find it
      reply = "Unfortunetly, I can't retrieve that location";
      replyTweet(reply);
    }

    else{
      //Takes important info and creates reply
      
      let weather = result[0].current.skytext; //weather
      let weatherEmoji = "⛅"; //emoji var
      let weatherRegexed = weather.replace(/ /g,"_"); //removes spaces and replaces with _
      
      //searched through emojiLib
      for(emojiName in emojiLib){
        //comparest the name of the emoji in emojiLib with the weather
        if(emojiName === weatherRegexed.toLowerCase()){
            //if match then emoji becomes part of the reply.
            weatherEmoji = emojiLib[emojiName].char;
            break;
        }
      }

      var degrees = String.fromCharCode(176) + "C"; // degress and celcius

      //template literal/lateral string
      reply = 
      `🌎:${result[0].location.name}\n🌡️:${result[0].current.temperature}${degrees}\n${weatherEmoji}:${weather}`;
      replyTweet(reply);
    }

    function replyTweet(reply){
      //Creates the response tweet JSON. 
      var res = {
        status: `@${name} ${reply}`, //template lateral string
        in_reply_to_status_id: nameID
      };
      //posts response tweet
      t.post('statuses/update',res);
    }
  });
});