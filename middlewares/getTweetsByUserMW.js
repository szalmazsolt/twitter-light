const getTweetsByUserMW = (objectRepo) => {

  const { tweetModel } = objectRepo;

  return (req, res, next) => {
    
    const tweets = tweetModel.find({ "user.id": res.locals.user.id });
    console.log('User tweets:', tweets)
    res.locals.tweets = tweets;
    next();

  };
};

module.exports = getTweetsByUserMW;