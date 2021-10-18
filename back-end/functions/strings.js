/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */

function upperFirstLetter(str) {
  str = str.split(' ');
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].slice(1);
  }
  str = str.join(' ');
  return str;
}
const SET = {
  num: '123456789',
  random: '123456789QWERTYUIOPASDFGHJKLZXCVBNM',
};
function randomNum(length) {
  let string = '';
  const { num } = SET;
  for (let i = 0; i < length; i++) {
    string += num.charAt(Math.floor(Math.random() * num.length));
  }
  return string;
}
function randomString(length) {
  let string = '';
  const { random } = SET;
  for (let i = 0; i < length; i++) {
    string += random.charAt(Math.floor(Math.random() * random.length));
  }
  return string;
}
function filterOne(id, arr) {
  const a = arr.filter((item) => {
    if (id == item.id) {
      return item;
    }
  });
  return a[0];
}
module.exports = {
  upperFirstLetter,
  randomNum,
  randomString,
  filterOne,
};
