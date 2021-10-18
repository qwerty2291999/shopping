/* eslint-disable consistent-return */
const HTTP = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { register, login } = require('./auth.services');
const { joiRegister, joiLogin } = require('./auth.validation');
const Error = require('../../../errors/errors');
const { accessToken, refreshToken } = require('../../../functions/jwt');

const err = new Error();
async function getLogin(req, res) {
  const { user } = req;
  res.json(user);
}
async function postLogin(req, res, next) {
  const data = req.body;
  const validate = joiLogin.validate(data);
  if (validate.error) {
    validate.error.code = HTTP.StatusCodes.BAD_REQUEST;
    next(validate.error);
  } else {
    const doc = await login(data);
    if (!doc) {
      next(err.usernamePassword());
    } else if (doc.message) {
      next(doc);
    } else {
      const aToken = accessToken({
        username: doc.username,
        id: doc.dataValues.id,
        role: doc.dataValues.role,
      });
      res.cookie('adminAccessToken', aToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });
      const rToken = refreshToken({
        username: doc.username,
        id: doc.id,
        role: doc.dataValues.role,
      });
      res.cookie('adminRefreshToken', rToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
      res.status(HTTP.StatusCodes.OK).json({ accessToken: aToken, refreshToken: rToken });
    }
  }
}
async function newToken(req, res, next) {
  const rToken = req.body.token;
  if (!rToken) {
    next(err.notAuthen());
  }
  jwt.verify(rToken, process.env.JWT, async (error, result) => {
    if (!error) {
      const { iat, exp, ...token } = result;
      const aToken = accessToken(token);
      res.cookie('accessToken', aToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });
      return res.status(HTTP.StatusCodes.OK).json({ aToken });
    }
    next(err.notAuthen());
  });
}
async function postRegiser(req, res, next) {
  const data = req.body;
  const validate = joiRegister.validate(data);
  if (validate.error) {
    validate.error.code = HTTP.StatusCodes.BAD_REQUEST;
    next(validate.error);
  } else {
    const doc = await register(data);
    if (doc.original) {
      next(err.duplicateDB(doc.original.detail));
    } else {
      res.json(doc);
    }
  }
}
async function logout(req, res) {
  res.json('logout');
}
module.exports = {
  getLogin,
  postLogin,
  newToken,
  postRegiser,
  logout,
};
