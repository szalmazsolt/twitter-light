const tweets = require('./seedData');

const seeder = (objectRepo, model) => {
  const { tweetModel, db } = objectRepo;
  return () => {
    if (model === 'tweet') {
      tweetModel
        .chain()
        .find()
        .remove();
      tweetModel.insert(tweets);
    }

    if (model === 'user') {
      userModel
        .chain()
        .find()
        .remove();
      userModel.insert(users);
    }

    db.saveDatabase(err => {
      if (err) {
        return console.log('Could not save DB')
      }
      console.log('Database seeded successfully')
    });
  }
};

module.exports = seeder;

