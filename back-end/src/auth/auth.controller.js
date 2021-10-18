/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
const HTTP = require('http-status-codes');
const jwt = require('jsonwebtoken');
const {
  register,
  find,
  login,
  verifyEmail,
  findOne,
  findForgot,
  createForgot,
  updateForgot,
  recoverPass,
  deleteForgot,
  updatePass,
} = require('./auth.services');
const { joiRegister, joiLogin, joiForgot, joiPassword } = require('./auth.validation');
const Error = require('../../errors/errors');
const { userAccessToken, userRefreshToken } = require('../../functions/jwt');
const { STATUS } = require('../../configs/enum');
const { sendMail, mailForgotPassword } = require('../../configs/mailer');
const { randomNum } = require('../../functions/numbers');
const { expiresMins } = require('../../functions/date');

const err = new Error();
async function getLogin(req, res) {
  const doc = await find();
  res.json(doc);
}
async function postLogin(req, res, next) {
  const data = req.body;
  const validate = joiLogin.validate(data);
  if (validate.error) {
    validate.error.code = HTTP.StatusCodes.BAD_REQUEST;
    return next(validate.error);
  }
  const doc = await login(data);
  if (!doc) {
    return next(err.usernamePassword());
  }
  if (doc.message) {
    return next(doc);
  }
  if (doc.verify === STATUS.verifyneeded) {
    await sendMail(doc.email);
    return next({ code: 403, message: 'An email has been sent please verify your account' });
  }
  const aToken = userAccessToken({
    username: doc.username,
    id: doc.id,
    email: doc.email,
    role: doc.role,
    verify: doc.verify,
  });
  res.cookie('accessToken', aToken, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  const rToken = userRefreshToken({
    username: doc.username,
    id: doc.id,
    email: doc.email,
    role: doc.role,
    verify: doc.verify,
  });
  res.cookie('refreshToken', rToken, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  });
  res.status(HTTP.StatusCodes.OK).json({ accessToken: aToken, refreshToken: rToken });
}
async function newToken(req, res, next) {
  const rToken = req.body.token;
  if (!rToken) {
    next(err.notAuthen());
  }
  jwt.verify(rToken, process.env.JWT, async (error, result) => {
    if (!error) {
      const { iat, exp, ...token } = result;
      const aToken = userAccessToken(token);
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
async function verify(req, res) {
  const { email } = req.params;
  const doc = await verifyEmail(email);
  if (doc[0] === 1) {
    return res.json('OK');
  }
  res.json('Failed');
}
async function forgotPass(req, res, next) {
  const { email } = req.body;
  const validate = joiForgot.validate({ email });
  if (validate.error) {
    validate.error.code = HTTP.StatusCodes.BAD_REQUEST;
    return next(validate.error);
  }
  const checkUser = await findOne({ email });
  if (!checkUser) {
    return next(err.notFound());
  }
  const send = await findForgot({ email: checkUser.email });
  const code = randomNum();
  if (send === null) {
    const url = await mailForgotPassword(code, checkUser.email);
    await createForgot({ code, email: checkUser.email, expiresAt: expiresMins(5) });
    res.json({ url, message: 'An email has been sent' });
  } else {
    const newCode = randomNum();
    const url = await mailForgotPassword(newCode, checkUser.email);
    await updateForgot({ email: checkUser.email }, { code: newCode, expiredAt: expiresMins(5) });
    res.json({ url, message: 'An email has been sent' });
  }
}
async function recover(req, res, next) {
  const { email } = req.params;
  const decoded = jwt.verify(email, process.env.JWT, (e, result) => {
    if (e) {
      return next(err.notFound());
    }
    return result;
  });
  const { code } = req.body;
  const r = await recoverPass(decoded, code);
  if (r.message) {
    return next(r);
  }
  res.json({ url: `http://localhost:3000/auth/recovery/changepass/${email}` });
}
async function changePass(req, res, next) {
  const { email } = req.params;
  const data = req.body;
  const validate = joiPassword.validate(data);
  if (validate.error) {
    validate.error.code = HTTP.StatusCodes.BAD_REQUEST;
    next(validate.error);
  }
  const { repeat_password, ...newData } = data;
  const decoded = jwt.verify(email, process.env.JWT, (error, result) => {
    if (error) return next(err.cannotDecode());
    return result;
  });
  const check = await findForgot({ email: decoded });
  if (check.status == STATUS.verified) {
    const forgot = await updatePass({ email: decoded }, newData);
    if (forgot[0] == 1 || forgot[0] == 0) {
      await deleteForgot({ email: decoded });
      res.json('Changed your password!');
    }
  } else {
    next(err.needToVerifyCode());
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
  verify,
  forgotPass,
  recover,
  changePass,
};
