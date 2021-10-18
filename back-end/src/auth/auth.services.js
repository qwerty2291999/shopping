/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
const jwt = require('jsonwebtoken');
const AuthData = require('./auth.data');
const Error = require('../../errors/errors');
const { comparePass } = require('../../functions/bcrypt');
const { STATUS } = require('../../configs/enum');

const err = new Error();

async function register(obj) {
  const doc = await AuthData.register(obj);
  return doc;
}

async function find() {
  const doc = await AuthData.find();
  return doc;
}
async function findOne(any) {
  const doc = await AuthData.findOne(any);
  return doc;
}
async function logout(obj) {
  return obj;
}
async function verifyEmail(email) {
  const decode = jwt.verify(email, process.env.JWT, (e, result) => {
    if (e) {
      return e;
    }
    return result;
  });
  const update = await AuthData.verify({ email: decode }, { verify: STATUS.verified });
  return update;
}
async function login(obj) {
  if (obj.email) {
    const doc = await AuthData.findOne({ email: obj.email });
    if (!doc) {
      return doc;
    }
    const pass = await comparePass(obj.password, doc.password);
    if (pass === false) {
      return err.usernamePassword();
    }
    return doc;
  }
  if (obj.username) {
    const doc = await AuthData.findOne({ username: obj.username });
    if (!doc) {
      return doc;
    }
    const pass = await comparePass(obj.password, doc.password);
    if (pass === false) {
      return err.usernamePassword();
    }
    return doc;
  }
}
async function findForgot(email) {
  const doc = await AuthData.findForgot(email);
  return doc;
}
async function createForgot(data) {
  const doc = await AuthData.createForgot(data);
  return doc;
}
async function updateForgot(email, data) {
  const doc = await AuthData.updateForgot(email, data);
  return doc;
}
async function recoverPass(email, code) {
  const doc = await AuthData.findForgot({ email });
  if (doc.code == code) {
    const doc1 = await AuthData.updateForgot({ email }, { status: STATUS.verified });
    return doc1;
  }
  return err.wrongCode();
}
async function updatePass(email, pass) {
  const doc = await AuthData.update(email, pass);
  return doc;
}
async function deleteForgot(email) {
  const doc = await AuthData.deleteForgot(email);
  return doc;
}
async function findCExpired() {
  const docs = await AuthData.findC({ status: STATUS.verifyneeded });
  const expired = docs.filter((item) => new Date(item.expiresAt).getTime() < Date.now());
  return expired;
}
module.exports = {
  register,
  find,
  logout,
  login,
  verifyEmail,
  findOne,
  findForgot,
  createForgot,
  updateForgot,
  recoverPass,
  deleteForgot,
  updatePass,
  findCExpired,
};
