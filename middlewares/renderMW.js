const renderMW = (view) => {
  return (req, res) => {
    console.log('render mw runs')
    res.status(200).render(view, res.locals)
  };
};

module.exports = renderMW;