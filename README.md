# twitter_weather_bot
## Summary
This project is a Twitter bot designed to provide users with the forecasted weather for that day. Users will @ the bot which will then reply with the forecasted weather in the location mentioned in the tweet.
In this project, I used the streaming API to retrieve a stream of tweets that mentioned @TheWeatherRobo. The bot would then read the tweet and use the text to search for the weather using MSN weather API.  If the location was legitemit, it will return with the current weather, else it would return with a generic 'could not find location'.
### Example of tweet
> user:<br />
> @weatherBot London
> <br />
> weatherBot:<br />
> @user Location: London, United Kingdom <br />
>       Temperature: 16°C
>       Weather: Mostly Cloudy

### How to run locally
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
```
This is used to access the twitter API. <br />
Next inside 'bot.js', you should change the name of the twitter account the stream will observe. This is the variable host.

```javascript
var host = "";
```
Change this line to the account you wish use. < br/>
Finally we need to change the regex expression to suit the account name you're using.

```javascript
var regex = /@ /i;
```
Make sure to leave the @ at the start and a space at the end.
