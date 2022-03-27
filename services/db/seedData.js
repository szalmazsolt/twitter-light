const { v4: uuidv4 } = require('uuid');

// Tweet schema
  // id
  // text
  // created_at
  // updated_at
  // user

module.exports.tweets = [
  {
    id: uuidv4(),
    text: 'Hello world! How are you doing?',
    created_at: Date.now(),
    updated_at: Date.now(),
    user: 'Zsolt', 
  },
  {
    id: uuidv4(),
    text: 'It\'s wonderful outside. Go out and smell the roses',
    created_at: Date.now() - 40000,
    updated_at: Date.now() - 30000,
    user: 'Jenny', 
  },
  {
    id: uuidv4(),
    text: 'Anybody completed the Messier Marathon this weekend?',
    created_at: Date.now() - 73000,
    updated_at: Date.now() - 73000,
    user: 'Zsolt', 
  },
  {
    id: uuidv4(),
    text: 'I am really worried about the mental state of Duffy Duck.',
    created_at: Date.now() - 20000,
    updated_at: Date.now() - 15000,
    user: 'Bob', 
  },
  {
    id: uuidv4(),
    text: 'I belive Twitter Light is far better than the original Twitter. :))',
    created_at: Date.now() - 80000,
    updated_at: Date.now() - 80000,
    user: 'Larry', 
  },
  {
    id: uuidv4(),
    text: 'My little Havanese pup, Pluto, is gonna have his monthly grooming today.',
    created_at: Date.now() - 15000,
    updated_at: Date.now() - 15000,
    user: 'Zsolt', 
  },
  {
    id: uuidv4(),
    text: 'I have been using Fortan a lot lately. Actually, I quite like it.',
    created_at: Date.now() - 100000,
    updated_at: Date.now() - 90000,
    user: 'Larry', 
  },
];