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
  console.log(url);
  console.log(text, tags, coordinates, user_id);
  axios.post(url, {params: {text, tags, coordinates, user_id}}).
  then((response) => {
    console.log(response.data);
    cb(response.data);
  }).catch((error) => {
    console.log('error creating posts');
    console.log(error);
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
      // TODO: Need to get user from client
      user: 'Hello',    // temporary user information
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
