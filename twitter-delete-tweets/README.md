## Delete Tweets and Retweets

### Motivation

In late 2020 and early 2021 A.D., Twitter has decided to become censorious to the point where I can no longer use their service.
I wanted to delete all of my content from Twitter, that had accumulated over the course of approximately 12 years.
Unfortunately there are no great tools to accomplish this, and Twitter's API is kind of a pain to work with.
Hence, I decided to write a browser script that deletes tweets for me.

### Usage

If you want to clean up tweets, you can use this script on the https://search.twitter.com page.
Simply ensure the script is active in [Tampermonkey](https://www.tampermonkey.net/), perform a search, and the script will automatically take care of deleting tweets.

### Caveats

The script is not smart enough to know if a tweet is "yours" or not, so it will attempt and fail to delete other tweets.
