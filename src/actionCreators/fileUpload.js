import actions from '../actions';
import { uploadFile } from '../services/pdfParser';

export const fileUploadActionCreator = (file, uuid) => async dispatch => {
  dispatch({
    type: actions.FILE_UPLOADING
  });
  try {
    const response = await uploadFile(file, uuid);
    console.log(response.data);
    // console.log(response['data']['data']);
    dispatch({
      type: actions.FILE_UPLOAD_SUCCEEDED,
      payload: await response.data
    });
  } catch (error) {
    dispatch({
      type: actions.FILE_UPLOAD_FAILED
    });
    // console.log(error);
  }
};
