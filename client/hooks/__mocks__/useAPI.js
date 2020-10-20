const useAPI = (url) => {
  let split = url.split('http://localhost:3001/api/reviews/')[1];
  if (split === '') return null;
  // eslint-disable-next-line prefer-destructuring
  if (split.indexOf('/') !== -1) split = split.split('/')[0];
  return [JSON.parse(split)];
};

export default useAPI;
