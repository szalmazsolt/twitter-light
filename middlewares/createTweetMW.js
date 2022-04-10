const createTweetMW = (objectRepo) => {

  const { tweetModel, uuidv4 } = objectRepo;
  
  return (req, res, next) => {
    const tweet = req.body.tweet.trim();

    const newTweet = {
      id: uuidv4(),
      text: tweet,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        id: res.locals.user.id,
        username: res.locals.user.username,
      }
    }

    const result = tweetModel.insert(newTweet);
    console.log('New tweet created:', result);

    res.locals.newTweet = newTweet;
    next();

  };
};

module.exports = createTweetMW;