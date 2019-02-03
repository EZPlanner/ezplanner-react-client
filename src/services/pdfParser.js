import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  method: 'post'
});

export const uploadFile = async (file = null, uuid = null) => {
  if (!file || !uuid) {
    return [];
  }
  let formData = new FormData();
  formData.append('file', file);

  return axios({
    url: 'https://ezplanner-flask-api.herokuapp.com/api/parser',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: formData,
    params: {
      uuid
    }
  });
};
