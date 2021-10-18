const jwt = require('jsonwebtoken');
const Errs = require('../../errors/errors');
const { STATUS } = require('../../configs/enum');

const err = new Errs();
function Auth(req, res, next) {
  const { token } = req.headers;
  if (token) {
    const accessToken = token.split(' ')[1];
    jwt.verify(accessToken, process.env.JWT, (error, result) => {
      if (result.verify === STATUS.verifyneeded) {
        return next(err.verify());
      }
      if (!error) {
        req.user = result;
        return next();
      }
      return next(err.notAuthen());
    });
  } else next(err.notAuthen());
}
module.exports = { Auth };
