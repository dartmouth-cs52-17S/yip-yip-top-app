import axios from 'axios';

const ROOT_URL = 'https://yip-yip.herokuapp.com/api';
// axios.post(`${ROOT_URL}/signin`, { email, password }).then((response) => {

// yip-yip.herokuapp.com/api/posts/?long=5.000001&lat=6.000001

export function fetchPosts(long, lat, cb) {
  const url = `${ROOT_URL}/posts/`;
  axios.get(url, {params: {long, lat}}).
  then((response) => {
    console.log(response.data);
    cb(response.data);
  }).catch((error) => {
    console.log(error);

  });
}

export function createPost(text, tags, coordinates, user_id, cb) {
  const url = `${ROOT_URL}/posts/`;
  axios.post(url, {params: {text, tags, coordinates, user_id}}).
  then((response) => {
    console.log(response.data);
    cb(response.data);
  }).catch((error) => {
    console.log(error);

  });
}
