import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  }
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2
  }
}))(MuiDialogContent);

class Disclaimer extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div style={{ margin: 15 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleClickOpen}
        >
          Disclaimer
        </Button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            From the EZPlanner Team
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
              EZPlanner does not retain any uploaded transcripts; all uploaded
              transcripts are deleted after parsing.
            </Typography>
            <Typography gutterBottom>
              The results of EZPlanner are known to be missing courses, such as
              courses with no pre-requisites (Soon to change).
            </Typography>
            <Typography gutterBottom>
              EZPlanner calculates courses you are eligible for based on the
              course pre-requisites, not the actual requirement (for exmaple we
              do not account for GPA, program specific requirements, etc).
            </Typography>
            <Typography gutterBottom>
              With all that said, EZPlanner should in no way be a primary source
              of information; take everything offered here with a grain of salt.
            </Typography>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default Disclaimer;
