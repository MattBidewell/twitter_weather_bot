const weather = require('weather-js'); // require weather api
const Twit = require('twit'); // require twitter api
const config = require('./config');

// retrieve content from emojiLib file
const emojisFile = require('./emojiLib');

// retrieve emojis
const emojiLib = emojisFile.emojis; 

// weather robot twitter obj
const t = new Twit(config.twitterKey);

const host = 'TheWeatherRobo'; // Twitter @ name.

// initiate watch for tweets mentioning host name.
const stream = t.stream('statuses/filter', { track: host });

// When tweet mentions host.
stream.on('tweet', function(tweet) {

  // get the tweet text
  const txt = tweet.text; 

  // use regex remove host name from tweet
  const regex = /@TheWeatherRobo /i; 
  
  // removes host name from tweet to leave with location
  const loc = txt.replace(regex, ''); 
  
  // get the twitter ID of sender
  const nameID = tweet.id_str; 
  
  // gets the twitter screen name of sender
  const name = tweet.user.screen_name; 
  
  let reply;
  
  function replyTweet(...replyText){
    // Creates the response tweet JSON.
    const response = replyText.join('');
    const res = {
      status: `@${name} ${response}`, // template lateral string
      in_reply_to_status_id: nameID
    };
    
    // posts response tweet
    t.post('statuses/update',res);
  }

  function getEmoji(weatherName){
    const emoji = '⛅'; 
    
    // removes spaces and replaces with _
    const weatherRegexed = weatherName.replace(/ /g,'_'); 
    
    // eslint-disable-next-line no-restricted-syntax
    for(emojiName in emojiLib){
      // comparest the name of the emoji in emojiLib with the weather
      if(emojiName === weatherRegexed.toLowerCase()){
          // if match then emoji becomes part of the reply.
          return emojiLib[emojiName].char;
      }
    }
    return emoji
  }
  
  /*
    Uses location from tweet to get weather from API. Automatically sets to celcius since
    celcius is life.
  */
  weather.find({search: loc, degreeType: 'C'}, function(err, result){
    if(err)throw err;

    // if location does not exist or MSN weather cannot find it
    if(result[0] === undefined){ 
      reply = "Unfortunetly, I can't retrieve that location";
      replyTweet(reply);
    }

    else{
      const currentWeather = result[0].current.skytext; 
      
      const weatherEmoji = getEmoji(currentWeather);
      
      // degress and celcius
      const degrees = `${String.fromCharCode(176)  }C`; 

      // template literal/lateral string
      reply = 
      `Today\n🌎:${result[0].location.name}\n🌡️:${result[0].current.temperature}${degrees}\n${weatherEmoji}:${getEmoji(currentWeather)}`;

      const forecastDay1 = 
      `\n\nForecast:\n${result[0].forecast[1].shortday}: ${getEmoji(result[0].forecast[1].skytextday)} with a low of ${result[0].forecast[1].low}${degrees} and a high of ${result[0].forecast[1].high}${degrees}`;

      const forecastDay2 = 
      `\n${result[0].forecast[2].shortday}: ${getEmoji(result[0].forecast[2].skytextday)} with a low of ${result[0].forecast[2].low}${degrees} and a high of ${result[0].forecast[2].high}${degrees}`;

      const forecastDay3 = 
      `\n${result[0].forecast[3].shortday}: ${getEmoji(result[0].forecast[3].skytextday)} with a low of ${result[0].forecast[3].low}${degrees} and a high of ${result[0].forecast[3].high}${degrees}`;


      replyTweet(reply, forecastDay1, forecastDay2, forecastDay3);
    }
  });
});