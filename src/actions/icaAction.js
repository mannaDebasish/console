import { FETCH_JOB, NEW_POST } from './types';

function fetchJob(jobName) {
  return (dispatch) => {
    fetch('../data/data.json')
      .then(res => res.json())
      .then(posts => {
        dispatch({
          type: FETCH_JOB,
          payload: posts.jobdetails[0]
        })
      });
  }
}

function createPost(post) {
  return (dispatch) => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(post)
    })
      .then(res => res.json())
      .then(data => dispatch({
        type: NEW_POST,
        payload: data
      }));
  }
}

export { fetchJob, createPost };