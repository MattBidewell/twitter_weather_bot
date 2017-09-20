# twitter_weather_bot
## Summary
This project is a Twitter bot designed to provide users with the forecasted weather for that day. Users will @ the bot which will then reply with the forecasted weather in the location mentioned in the tweet.
### Example of tweet
user:<br />
@weatherBot London
<br />
weatherBot:<br />
@user Location: London, United Kingdom <br />
      Temperature: 16°C
      Weather: Mostly Cloudy

###How to run locally
Before cloning make sure you have a Twitter Dev account and have application keys ready. You can find out more here: [Twitter Dev](https://dev.twitter.com/) <br />
Clone the directory on to your system.<br />
Next create a file and call it 'config.js' in here add your Twitter dev keys. For example:
< br/>

```javascript
module.exports = {
  twitterKey: {
    consumer_key: 'XXXXXXX',
    consumer_secret: 'xxxxx',
    access_token: 'XXXXXXX',
    access_token_secret: 'xxxxx'
  }
};
