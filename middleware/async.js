// Moved the try catch block in a single place so we don't have to repeat it in every route handler.
module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
};
