export function getTimeGMT(UTCDateString, type = 'complexity') {
  if (!UTCDateString) {
    return '-';
  }

  function formatFunc(str) {
    return str > 9 ? str : '0' + str;
  }

  const date = new Date(UTCDateString);
  const year = date.getFullYear();
  const mon = formatFunc(date.getMonth() + 1);
  const day = formatFunc(date.getDate());
  let hour = date.getHours();
  hour = formatFunc(hour);
  const min = formatFunc(date.getMinutes());
  const seconds = formatFunc(date.getSeconds());
  if (type === 'complexity') {
    return `${year}-${mon}-${day} ${hour}:${min}:${seconds}`;
  } else {
    return `${year}-${mon}-${day}`;
  }
}
