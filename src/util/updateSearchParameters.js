export default query => {
  const url = new URL(window.location);
  const searchParams = new URLSearchParams(url.search);

  Object.keys(query).forEach(key => {
    const value = query[key];

    if (value) {
      searchParams.set(key, query[key]);
      return;
    }

    searchParams.delete(key);
  });

  // Sort params
  searchParams.sort();

  url.search = searchParams;

  return url;
};
