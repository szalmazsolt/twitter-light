const createTweetMW = (objectRepo) => {

  const { tweetModel, uuidv4 } = objectRepo;
  
  return (req, res, next) => {
    const tweet = req.body.tweet.trim();

    if (tweet.length === 0) {
      res.locals.error = 'Tweet cannot be blank';
    } else if (tweet.length > 144) {
      res.locals.tweet = tweet
      res.locals.error = 'A tweet cannot be more than 144 chars'
    }

    if (typeof res.locals.error !== 'undefined') {
      return res.status(400).render('tweets/tweet_form', res.locals)
    }

    const newTweet = {
      id: uuidv4(),
      text: tweet,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      user: {
        id: res.locals.loggedInUser.id,
        username: res.locals.loggedInUser.username,
      }
    }

    tweetModel.insert(newTweet);

    res.locals.newTweet = newTweet;
    next();

  };
};

module.exports = createTweetMW;