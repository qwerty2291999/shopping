const AuthData = require('./auth.data');
const Error = require('../../../errors/errors');
const { comparePass } = require('../../../functions/bcrypt');

const err = new Error();

async function register(obj) {
  const doc = await AuthData.register(obj);
  return doc;
}

async function find() {
  const doc = await AuthData.find();
  return doc;
}

async function logout(obj) {
  return obj;
}

async function login(obj) {
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
module.exports = {
  register,
  find,
  logout,
  login,
};
