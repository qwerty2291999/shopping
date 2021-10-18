const bcrypt = require('bcrypt');

async function hashPass(pass) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(pass, salt);
  return hash;
}
async function comparePass(send, get) {
  const compare = await bcrypt.compare(send, get);
  return compare;
}
module.exports = { hashPass, comparePass };
