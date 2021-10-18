const jwt = require('jsonwebtoken');
const Errs = require('../../../errors/errors');

const err = new Errs();
function Auth(req, res, next) {
  const { token } = req.headers;
  if (token) {
    const accessToken = token.split(' ')[1];
    jwt.verify(accessToken, process.env.JWT, (error, result) => {
      if (!error) {
        req.user = result;
        next();
      } else {
        next(err.notAuthen());
      }
    });
  } else next(err.notAuthen());
}
function Admin(req, res, next) {
  const { token } = req.headers;
  if (token) {
    const accessToken = token.split(' ')[1];
    jwt.verify(accessToken, process.env.JWT, (error, result) => {
      if (!error) {
        if (result.role === 'admin') {
          req.user = result;
          next();
        } else {
          next(err.notAuthen());
        }
      } else {
        next(err.notAuthen());
      }
    });
  } else next(err.notAuthen());
}
module.exports = { Auth, Admin };
