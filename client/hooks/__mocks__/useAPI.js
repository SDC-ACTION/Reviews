/* eslint-disable prefer-destructuring */
const useAPI = (url) => {
  let split = url.split(`${process.env.API_URL}/`)[1];
  if (split.indexOf('?') !== -1) split = split.split('?')[0];
  if (split.indexOf('/summary') !== -1) split = split.split('/')[0];
  if (split === '') return null;
  return [JSON.parse(split)];
};

export default useAPI;
