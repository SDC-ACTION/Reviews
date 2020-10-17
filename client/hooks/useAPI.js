import { useState, useEffect } from 'react';

const useAPI = (url) => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error fetching from API');
        }
        return res.json();
      })
      .then((data) => {
        setApiData(data);
      });
  }, []);

  return apiData;
};

export default useAPI;
