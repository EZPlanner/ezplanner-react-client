import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { searchStyle } from './theme';
import { connect } from 'react-redux';
import { fileUploadActionCreator } from '../actionCreators';
import { Paper } from '@material-ui/core';
import Upload from '@material-ui/icons/CloudUpload';
import Spinner from './FileUploadSpinner';

// https://material-ui.com/demos/autocomplete/

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {
      fileName: null
    };
  }

  handleUpload = event => {
    if (event.target.files.length > 0) {
      if (this.ValidateSize(event.target.files[0])) {
        this.setState({ fileName: event.target.files[0].name });
        this.props.uploadFile(event.target.files[0], this.props.uid);
      }
    }
  };

  ValidateSize(file) {
    var FileSize = file.size / 1024 / 1024; // in MB
    if (FileSize > 1) {
      alert('File size exceeds 1 MB');
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <Paper className={this.classes.root} elevation={1}>
        <InputBase
          className={this.classes.input}
          value={this.state.fileName || ''}
          placeholder="Upload your transcript!"
          id="file"
          disabled
        />
        <Divider className={this.classes.searchDivider} />
        <IconButton
          color="primary"
          className={this.classes.iconButton}
          aria-label="Enter"
          onClick={this.handleSubmit}
          component="label"
        >
          <Upload />
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={event => this.handleUpload(event)}
            name="selectedFile"
            accept="application/pdf"
          />
        </IconButton>

        {this.props.uploading ? <Spinner /> : null}
      </Paper>
    );
  }
}

FileUpload.propTypes = {
  classes: PropTypes.object.isRequired,
  uploadFile: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
  uploading: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => ({
  uploadFile: (file, uid) => {
    dispatch(fileUploadActionCreator(file, uid));
  }
});
const mapStateToProps = state => ({
  uid: (state.userInfo && state.userInfo.uid) || null,
  uploading: state.isUploading
});

export default withStyles(searchStyle)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FileUpload)
);
