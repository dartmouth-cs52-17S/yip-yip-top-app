import axios from 'axios';

const ROOT_URL = 'https://yip-yip.herokuapp.com/api';

export function startAuth(pn, cb)  {
  const params = {
    'client_id': 'z84JtDyqbr7VldTci4QupQaaD9akB0rT',
    'connection': 'sms',
    'phone_number': '+15712155245',
    'send': 'code'
  }
  axios.post('https://bhollander823.auth0.com/passwordless/start', params, {headers: {
    'Content-Type': 'application/json'
  }}).
  then((response) => {
    console.log(response);
    cb(response.data);
  }).catch((error) => {
    console.log('error in auth');
    console.log(error.response);
  })
}

export function fetchPosts(long, lat, cb) {
  axios.get(`${ROOT_URL}/posts/`, { params: { long, lat } }).
  then((response) => {
    console.log(response.data);
    cb(response.data);
  }).catch((error) => {
    console.log(error);
    console.log(`error fetching posts with ${lat} ${long}`);
  });
}

export function createPost(post, cb) {
  console.log(`post is ${JSON.stringify(post)}`);
  axios.post(`${ROOT_URL}/posts/`, post).
  then((response) => {
    console.log(`Post created. ${response.data}`);
    cb(response.data);
  }).catch((error) => {
    console.log(`error creating posts. ${error}`);
  });
}

export function getPost(post_id, cb) {
  const url = `${ROOT_URL}/posts/${post_id}`;
  axios.get(url, {params: {post_id}}).
  then((response) => {
    console.log(response.data);
    cb(response.data);
  }).catch((error) => {
    console.log(error);

  });
}

export function deletePost(post_id, cb) {
  const url = `${ROOT_URL}/posts/${post_id}`;
  axios.delete(url, {params: {post_id}}).
  then((response) => {
    console.log(response.data);
    cb(response.data);
  }).catch((error) => {
    console.log(error);
  });
}

export function editPost(post, fields, action, cb) {
  const url = `${ROOT_URL}/posts/${post._id}`;
  let params;
  if (action == 'COMMENT_ACTION') {
    params = {
      action,
      id: post.post_id,
      commentId: fields.commentId,
      user: fields.user_id,
    }
  } else {
    params = {
      user: fields.user_id,
      action
    }
  }
  axios.put(url,params).
  then((response) => {
    console.log(response.data);
    cb(response.data);
  }).catch((error) => {
    console.log(error);
  });
}
