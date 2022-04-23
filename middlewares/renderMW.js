const renderMW = (view) => {
  return (req, res) => {
    if (typeof req.session.userId === 'undefined') {
      console.log('Session id:' ,req.session.userId)
      res.locals.loggedInUser = undefined;
      // console.log('Logged In user:', loggedInUser)
      console.log('user:', res.locals.user)
    }
    return res.status(200).render(view, res.locals)
  };
};

module.exports = renderMW;