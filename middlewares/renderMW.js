const renderMW = (view) => {
  return (req, res) => {
    if (typeof req.session.userId === 'undefined') {
      res.locals.loggedInUser = null;
    }
    res.status(200).render(view, res.locals)
  };
};

module.exports = renderMW;