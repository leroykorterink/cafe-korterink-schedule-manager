export default (path = "/", params) =>
  Object.keys(params).reduce(
    (accumulator, paramKey) =>
      accumulator.replace(`:${paramKey}`, params[paramKey]),
    path
  );
