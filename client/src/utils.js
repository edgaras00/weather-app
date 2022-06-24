const fahrenheitToCelsius = (f) => {
  return Math.round(((f - 32) * 5) / 9);
};

const convertDate = (timezone, time) => {
  // Convert UNIX time to searched location's current time
  const localUTC = timezone + time;
  const date = new Date(localUTC * 1000);
  return date
};

export {fahrenheitToCelsius, convertDate};