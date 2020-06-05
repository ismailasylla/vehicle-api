module.exports = function (req, res, next) {
  //401
  if (!req.user.isAdmin) return res.status(403).send('Access denied.');
  next();
};
