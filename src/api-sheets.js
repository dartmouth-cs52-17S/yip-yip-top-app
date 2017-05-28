import axios from 'axios';

/* eslint-disable max-len */

const ROOT_URL = 'https://sheets.googleapis.com/v4/spreadsheets/1bf0Tuhm8mH0qLSHiYjKghV4QDoVSoZMaFtVG2zte6PQ/values/Sheet1!A1:F1:append?valueInputOption=USER_ENTERED?key=AIzaSyDRxYT09ELm3g9oNuMyCCYzZe2wGJ_Z0qU';
// from https://developers.google.com/sheets/api/samples/writing#append_values
// 401 error on submission...

export function saveReport(post) {
  const params = {
    range: 'Sheet1!A1:F1',
    majorDimension: 'ROWS',
    values: [
    [post.timestamp, post.reporter, post.reportee, post.post_id, post.text, post.score],
    ],
  }
  console.log(`root url and params is ${ROOT_URL} ${JSON.stringify(params)}`)
  axios.post(ROOT_URL, params)
  .then((response) => {
    console.log(response.data);
  }).catch((error) => {
    console.log(error);
  });
}
