import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 300,
  duration: '30s',
  // stages: [
  //   { duration: '30s', target: 20 },
  //   { duration: '1m30s', target: 10 },
  //   { duration: '20s', target: 0 },
  // ],
};

export default function () {
  const random = Math.floor(Math.random() * 10000000 +1)
  // for (let i = 0; i < 1000; i++) {
    http.get(`http://localhost:3000/products/${random}/styles`)
  // }
  console.log(random)
  // http.get(`http://localhost:3000/products/${random}/styles`)
  // sleep(1);
}