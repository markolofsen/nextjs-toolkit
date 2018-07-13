/* eslint-disable react/no-multi-comp */

import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';

import Icon from '@material-ui/core/Icon';
import ImageGallery from 'react-image-gallery';


import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'

const theme = createMuiTheme({
	overrides: {
		MuiModal: {
			// Name of the rule
			root: {
				"& > div": {
					background: 'transparent'
				}
			}
		}
	}
});

// const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);
@withStyles(styles)
class SimpleDialogDemo extends React.Component {

	state = {
		open: false,
		gallery_active: false
	};

	componentWillUnmount() {
		this.props.onRef(undefined)
	}

	componentDidMount() {
		this.props.onRef(this)
	}

	handleClickOpen = () => {
		this.setState({open: true});
	};

	handleClose = value => {
		this.setState({open: false});
	};

	render() {

    const {classes} = this.props

		if (!this.state.open) {
			return <div/>
		}

		return (
			<MuiThemeProvider theme={theme}>

				<Dialog onClose={this.handleClose} fullScreen open={this.state.open}>
					<div>
						<div className={classes.dataGallery}>
							<div className={classes.close} onClick={this.handleClose}>
								<Icon>close</Icon>
							</div>
							<ImageGallery items={this.props.images}/>
						</div>
					</div>
				</Dialog>

			</MuiThemeProvider>
		);
	}
}

SimpleDialogDemo.propTypes = {
	images: PropTypes.array.isRequired
};

export default SimpleDialogDemo;
