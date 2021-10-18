function now() {
  const nowDate = new Date(Date.now());
  const sec0 = new Date(nowDate.setSeconds(0));
  return sec0;
}
function startDate(start) {
  if (start === 0) {
    return now();
  }
  const mili = 1000 * 60 * 60 * 24 * start;
  const startD = new Date(now().getTime() + mili);
  const sec0 = new Date(startD.setSeconds(0));
  return sec0;
}
function endDate(start, end) {
  const mili = 1000 * 60 * 60 * 24 * end;
  const endD = new Date(startDate(start).getTime() + mili);
  const sec0 = new Date(endD.setSeconds(0));
  return sec0;
}
function expiresMins(mins) {
  const mili = 1000 * 60 * mins;
  const t = new Date(Date.now() + mili);
  const sec0 = new Date(t.setSeconds(0));
  return sec0;
}
module.exports = {
  now,
  startDate,
  endDate,
  expiresMins,
};
