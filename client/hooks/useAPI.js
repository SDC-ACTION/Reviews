import { useState, useEffect } from 'react';
import sampleReviews from '../sampleReviews.json';
import sampleReviewSummary from '../sampleReviewSummary.json';

const useAPI = (url) => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          if (url.indexOf('reviews/1/summary') !== -1) return [sampleReviewSummary[0]];
          if (url.indexOf('reviews/2/summary') !== -1) return [sampleReviewSummary[1]];
          if (url.indexOf('reviews/1?limit=1') !== -1) return [sampleReviews[0]];
          if (url.indexOf('reviews/2?limit=1') !== -1) return [sampleReviews[1]];
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
