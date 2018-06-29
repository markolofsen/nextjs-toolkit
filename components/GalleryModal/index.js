/* eslint-disable react/no-multi-comp */

import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import Icon from '@material-ui/core/Icon';
import ImageGallery from 'react-image-gallery';

import s from './theme.scss'

const theme = createMuiTheme({
  overrides: {
    MuiModal: {
      // Name of the rule
      root: {
        "& > div": {
            background: 'transparent',
        }
      },
    },
  },
});



// const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

class SimpleDialogDemo extends React.Component {

  state = {
    open: false,
    gallery_active: false,
  };

  componentWillUnmount () {
      this.props.onRef(undefined)
  }

  componentDidMount() {
      this.props.onRef(this)
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = value => {
    this.setState({ open: false });
  };


  render() {

    if(!this.state.open) {
      return <div />
    }




    return (
      <MuiThemeProvider theme={theme}>

          <Dialog onClose={this.handleClose}
              fullScreen
              open={this.state.open}
              >
            <div>
                <div className={s.dataGallery}>
                    <div className={s.close} onClick={this.handleClose}>
                        <Icon>close</Icon>
                    </div>
                    <ImageGallery items={this.props.images} />
                </div>
            </div>
          </Dialog>

      </MuiThemeProvider>
    );
  }
}

SimpleDialogDemo.propTypes = {
  images: PropTypes.array.isRequired,
};

export default withStyles(s)(SimpleDialogDemo);
