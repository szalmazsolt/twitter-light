const saveDBMW = (objectRepo) => {

  const { db } = objectRepo;

  return (req, res, next) => {
    console.log('SaveDBMW runs...')

    db.saveDatabase(err => {
      if (err) {
        return res.status(500).render('error');
      }

      console.log('Saving DB successfull...')
      return next();
    });
  };

};

module.exports = saveDBMW;