import axios from 'axios';
export const uploadFile = async (file = null, uid = null) => {
  if (!file || !uid) {
    return [];
  }
  let formData = new FormData();
  formData.append('file', file);

  return axios({
    url: `http://api.ezplanner-sandbox.mochahub.io/transcript/courses/${uid}`,
    method: 'POST',
    data: formData,
    params: {
      uid
    }
  });
};
