import axios from 'axios';

const ROOT_URL = 'https://yip-yip.herokuapp.com/api';
// const ROOT_URL = 'http://localhost:9090/api';


export function getUserPosts(user_id, page, cb) {
  // console.log('user id', user_id);
  axios.get(`${ROOT_URL}/userPosts/${user_id}`, { params: { page }}).
  then((response) => {
    // console.log('posts for user', user_id, page, response);
    cb(response.data, null);
  }).catch((error) => {
    // console.log('error in user posts', error.data);
    cb(null, error);
  })
}

export function createReport(report, cb) {
  // { reporter, item, type, severity, additionalInfo }
  // console.log(`report is ${JSON.stringify(report)}`);
  axios.post(`${ROOT_URL}/report`, report)
  .then((response) => {
    // console.log(`Report created. ${response.data}`);
    cb(response.data);
  }).catch((error) => {
    // console.log(`error creating posts. ${error}`);
  });
}

export function startAuth(pn, cb)  {
  const params = {
    'client_id': 'z84JtDyqbr7VldTci4QupQaaD9akB0rT',
    'connection': 'sms',
    'phone_number': pn,
    'send': 'code'
  }
  axios.post('https://bhollander823.auth0.com/passwordless/start', params, {headers: {
    'Content-Type': 'application/json'
  }}).
  then((response) => {
    // console.log(response.data);
    cb(response.data, null);
  }).catch((error) => {
    cb(null, error);
    // console.log /('error in auth');
    // console.log(error.response);
  })
}

export function codeAuth(pn, code, cb) {
  const params = {
    client_id: 'z84JtDyqbr7VldTci4QupQaaD9akB0rT',
    connection: 'sms',
    username: pn,
    password: code,
    scope: 'openid'
  }
  axios.post('https://bhollander823.auth0.com/oauth/ro', params,
    { headers: { 'Content-Type': 'application/json' }})
  .then((response) => {
    // console.log(response.data);
    cb(response.data, null);
  }).catch((error) => {
    cb(null, error)
    // console.log(`error in codeAuth. ${error}`);
  })
}

export function fetchPosts(long, lat, sort, page, user, cb) {
  // console.log(`sort by ${sort}`);
  axios.get(`${ROOT_URL}/posts/`, { params: { long, lat, sort, page, user } }).
  then((response) => {
    // console.log(response);
    cb(response.data, null);
  }).catch((error) => {
    // console.log(error.response);
    // console.log(`error fetching posts with long: ${long}, lat: ${lat} with sort of ${sort}`);
    cb(null, error);
  });
}

export function searchPosts(long, lat, tags, page, user, cb) {
  // console.log('search posts lat:', lat, 'long:', long);
  axios.get(`${ROOT_URL}/search/`, { params: { long, lat, tags, page, user } }).
  then((response) => {
    // console.log(response, null);
    cb(response.data);
  }).catch((error) => {
    // console.log(error);
    // console.log('error searching posts');
    cb(null, error);
  })
}

export function createPost(post, cb) {
  // console.log(`post is ${JSON.stringify(post)}`);
  axios.post(`${ROOT_URL}/posts/`, post).
  then((response) => {
    // console.log(`Post created. ${response.data}`);
    cb(response.data);
  }).catch((error) => {
    // console.log(`error creating posts. ${error}`);
  });
}

export function getPost(post_id, user, cb) {
  const url = `${ROOT_URL}/posts/${post_id}`;
  axios.get(url, {params: {post_id, user}}).
  then((response) => {
    // console.log(response.data);
    cb(response.data, null);
  }).catch((error) => {
    // console.log(error);
    cb(null, error);
  });
}

export function deletePost(post_id, cb) {
  const url = `${ROOT_URL}/posts/${post_id}`;
  axios.delete(url, {params: {post_id}}).
  then((response) => {
    // console.log(response.data);
    cb(response.data);
  }).catch((error) => {
    // console.log(error);
  });
}

export function editPost(postId, fields, action, cb) {
  const url = `${ROOT_URL}/posts/${postId}`;
  let params;
  if (action == 'CREATE_COMMENT') {
    params = {
      comment: fields.comment,
      user: fields.user,
      action,
    }
  } else if (action == 'DOWNVOTE_COMMENT') {
    params = {
      commentId: fields.commentId,
      user: fields.user,
      action,
    }
  } else if (action == 'UPVOTE_COMMENT') {
    params = {
      commentId: fields.commentId,
      user: fields.user,
      action,
    }
  } else if (action == 'DELETE_COMMENT') {
    params = {
      commentId: fields.commentId,
      action,
    }
  } else {
    params = {
      user: fields.user,
      action
    }
  }

  axios.put(url, params).
  then((response) => {

    cb(response.data, null);
  }).catch((error) => {
    cb(null, error);
  });
}

export function getTrendingTags(long, lat, cb) {
  // console.log('getting trending');
  axios.get(`${ROOT_URL}/tags/`, { params: { long, lat } }).
  then((response) => {
    // console.log(response);
    cb(response.data)
  })
}
