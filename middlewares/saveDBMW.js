const saveDBMW = (objectRepo) => {

  const { db } = objectRepo;

  return (req, res, next) => {

    db.saveDatabase(err => {
      if (err) {
        return res.status(500).render('error');
      }

      next();
    });
  };

};

module.exports = saveDBMW;