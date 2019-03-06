import actions from '../actions';
import { uploadFile } from '../services/pdfParser';

export const fileUploadActionCreator = (file, uid) => async dispatch => {
  dispatch({
    type: actions.FILE_UPLOADING
  });
  try {
    let response = await uploadFile(file, uid);
    //TODO [Zahin] change the line below...
    response = response.data.data;
    dispatch({
      type: actions.FILE_UPLOAD_SUCCEEDED,
      payload: await response
    });
  } catch (error) {
    dispatch({
      type: actions.FILE_UPLOAD_FAILED
    });
  }
};
