module.exports = function (req, res, next) {
  // Status 403 => forbiden access.
  if (!req.user.isAdmin) return res.status(403).send('Access denied.');
  next();
};
