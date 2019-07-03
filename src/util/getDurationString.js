export default minutes => {
  const hours = Math.trunc(minutes / 60)
    .toString()
    .padStart(2, "0");

  const remainingMinutes = Math.abs(minutes % 60)
    .toString()
    .padStart(2, "0");

  return `${hours}:${remainingMinutes}`;
};
