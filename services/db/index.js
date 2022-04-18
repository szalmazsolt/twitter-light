const path = require('path');
const loki = require('lokijs');

const db = new loki(path.join(__dirname, 'data.db'));

const initializeDB = (cb) => {
  db.loadDatabase({}, err => {
  
    if (err) {
      return cb(err);
    }

    // Tweet model
      // id:String
      // text:String
      // createdAt:Date
      // updatedAt:Date
      // user: userId
    
    let tweetModel = db.getCollection('tweets');
    if (tweetModel === null) {
      tweetModel = db.addCollection('tweets', {
        indices: ['id']
      });
    }

    // User Model
      // id:String
      // username:String
      // email:String
      // password:String/Hash
      // createdAt:Date
      // profile_img:String

    let userModel = db.getCollection('users');
    if (userModel === null) {
      userModel = db.addCollection('users', {
        unique: ['email'],
        indices: ['id', 'email']
      })
    }

    db.saveDatabase(err => {
      // console.log('DB saved')
      cb(err, { db, tweetModel, userModel })
    });
  });
};

module.exports = initializeDB;
