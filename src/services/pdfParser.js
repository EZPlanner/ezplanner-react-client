import axios from 'axios';
export const uploadFile = async (file = null, uid = null) => {
  if (!file || !uid) {
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
      uid
    }
  });
};
