const jwt = require('jsonwebtoken');

function accessToken(obj) {
  const result = jwt.sign(
    {
      id: obj.id,
      username: obj.username,
      role: obj.role,
      verify: obj.verify,
    },
    process.env.JWT,
    { expiresIn: '1d' },
  );
  return result;
}
function refreshToken(obj) {
  const result = jwt.sign(
    {
      id: obj.id,
      username: obj.username,
      role: obj.role,
      verify: obj.verify,
    },
    process.env.JWT,
    {
      expiresIn: '7d',
    },
  );
  return result;
}
function userAccessToken(obj) {
  const result = jwt.sign(
    {
      id: obj.id,
      username: obj.username,
      email: obj.email,
      role: obj.role,
      verify: obj.verify,
    },
    process.env.JWT,
    { expiresIn: '1d' },
  );
  return result;
}
function userRefreshToken(obj) {
  const result = jwt.sign(
    {
      id: obj.id,
      username: obj.username,
      email: obj.email,
      role: obj.role,
      verify: obj.verify,
    },
    process.env.JWT,
    {
      expiresIn: '7d',
    },
  );
  return result;
}
module.exports = {
  accessToken,
  refreshToken,
  userAccessToken,
  userRefreshToken,
};
