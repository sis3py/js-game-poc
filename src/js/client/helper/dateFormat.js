export const getTime = (date) => {
  const tmpDate = new Date(date);
  return `${tmpDate.getHours()}:${tmpDate.getMinutes()}:${tmpDate.getSeconds()}`;
};
