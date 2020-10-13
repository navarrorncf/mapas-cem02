const shortenString = (string, len) => {
  if (len >= string.length) return string;
  return string.substring(0, len);
};

export default shortenString;
