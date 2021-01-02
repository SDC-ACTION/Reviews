import http from 'k6/http';
import { Rate } from 'k6/metrics';
import { sleep } from 'k6';

let errorRate = new Rate('error_rate');

export let options = {
    stages: [
        // { duration: '3m',target: 10 },
        // { duration: '3m', target: 100 },
        { duration: '3m', target: 1000, rps: 1000}
    ],
    thresholds: {
        'failed requests': ['rate<0.1']
    }
};

export default () => {
    let productId = Math.floor(Math.random() * (5999999 - 5399999) + 5399999);
    let reviewRes = http.get(`http://localhost:3001/api/reviews/${productId}`);

    if (reviewRes.error) errorRate.add(reviewRes.status);
    
    sleep(1);
}