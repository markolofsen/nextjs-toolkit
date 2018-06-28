// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
// import purple from '@material-ui/core/colors/purple';

const styles = theme => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
	},
	progress: {
		// margin: `0 auto`,
	},
	colorWhite: {
		color: '#fff',
	}
});

function Preloader(props) {
	const {classes, size, color} = props;
	let progressSize = 50
	if(size) progressSize = size

	let setClasses = {}
	if(color == 'white') {
		setClasses = {
			colorPrimary: classes.colorWhite
		}
	}

	return (
		<div className={classes.root}>
			<CircularProgress
				className={classes.progress}
				size={progressSize}
				classes={setClasses}
				/>
		</div>
	);
}

Preloader.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Preloader);
