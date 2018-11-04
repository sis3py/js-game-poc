const getTime = (date) => {
  const tmpDate = new Date(date);
  return `${`0${tmpDate.getHours()}`.slice(-2)}:${`0${tmpDate.getMinutes()}`.slice(
    -2,
  )}:${`0${tmpDate.getSeconds()}`.slice(-2)}`;
};

module.exports = { getTime };
