const useAPI = (url) => {
  const split = url.split('http://localhost:3001/api/reviews/')[1];
  if (split === '') return null;
  return [JSON.parse(split)];
};

export default useAPI;
