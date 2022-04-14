const renderMW = (view) => {
  return (req, res) => {
    res.status(200).render(view, res.locals)
  };
};

module.exports = renderMW;