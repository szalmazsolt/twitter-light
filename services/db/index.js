const path = require('path');
const loki = require('lokijs');

const db = new loki(path.join(__dirname, 'data.db'));

const initializeDB = (cb) => {
  db.loadDatabase({}, err => {
  
    if (err) {
      return cb(err);
    }
    
    let tweetModel = db.getCollection('tweets');
    if (!tweetModel) {
      tweetModel = db.addCollection('tweets');
    }
  
    db.saveDatabase(err => {
      if (err) {
        return cb(err);
      }
      
      cb(undefined, { tweetModel })
    });
  });
};

module.exports = initializeDB;
