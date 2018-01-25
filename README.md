# Twitter Weather Bot
## Summary
This project is a Twitter bot designed to provide users with the forecasted weather for that day. Users @ the bot which will then reply with the forecasted weather in the location mentioned in the tweet.

I used the streaming API to retrieve a stream of tweets that mentioned @TheWeatherRobo. The bot would then read the tweet and use the text to search for the weather using MSN weather API.  If the location was real, it will return with the current weather, else it would return with a generic 'could not find location' error message.

### Recent updates 

#### January 2018
Version 2: Updated the codebase to ES6 features, extended the detail of the response by adding a following 3 day forecast of high and low temperatures.
#### September 2017

A Recent update has included the functionality for the bot to reply using emojis. The bottom line in the response tweet includes the weather, to create a more friendly experience the bot replies with an emoji matching the expected forecast.

### Example of tweet
![Example of weather bot in action](https://i.imgur.com/l49SCuJ.png)

### How to run locally
Before cloning makes sure you have a Twitter Dev account and have application keys ready. You can find out more here: [Twitter Dev](https://dev.twitter.com/)

Clone the directory onto your system.

Next, create a file and call it 'config.js' in here add your Twitter dev keys. For example:

```javascript
module.exports = {
  twitterKey: {
    consumer_key: 'XXXXXXX',
    consumer_secret: 'xxxxx',
    access_token: 'XXXXXXX',
    access_token_secret: 'xxxxx'
  }
};
```

This is used to access the Twitter API.

Next, inside 'bot.js', you should change the name of the twitter account the stream will observe. This is the variable host.

```javascript
var host = "";
```
Change this line to the account you wish to use.
Finally, we need to change the regex expression to suit the account name you're using.

```javascript
var regex = /@ /i;
```
Make sure to leave the @ at the start and space at the end.