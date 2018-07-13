/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable react/no-multi-comp */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

// import {withRouter} from 'react-router';
import {connect} from 'react-redux';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import Duration from './Duration';

import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'


@withStyles(styles)
class PlayerControls extends Component {

	render() {
		const {
			played,
			duration,
			playing,
			muted,
			loop,
			volume,
			playbackRate
		} = this.props.state

		return (
			<div>
				<ul className={classes.playerControls}>
					<li>
						<ul className={classes.playerControlsButtons}>
							<li>
								<IconButton aria-label="Play" onClick={this.props.playPause}>
									{playing
										? <Icon>pause</Icon>
										: <Icon>play_arrow</Icon>}
								</IconButton>
							</li>
							<li className={classes.playerControlsNoMobile}>
								<IconButton aria-label="Fullscreen" onClick={this.props.onClickFullscreen}>
									<Icon>fullscreen</Icon>
								</IconButton>
							</li>
							<li className={classes.playerControlsNoMobile}>
								<IconButton aria-label="Play" onClick={this.props.toggleMuted}>
									{muted
										? <Icon>volume_mute</Icon>
										: <Icon>volume_up</Icon>}
								</IconButton>
							</li>
						</ul>
					</li>
					<li className={classes.playerControlsDuration}>
						<Duration seconds={played * duration}/>
						/
						<Duration seconds={duration}/>
					</li>
					<li className={classes.playerControlsNoMobile}>
						<FormControlLabel control={< Switch checked = {
							playbackRate == 3
								? true
								: false
						}
						onChange = {
							(event, checked) => this.props.setPlaybackRate(checked)
						} />} label="Faster"/>

						<FormControlLabel control={< Switch checked = {
							loop
						}
						onChange = {
							this.props.toggleLoop
						} />} label="Loop"/>
					</li>
				</ul>

			</div>
		)
	}
}

PlayerControls.propTypes = {
  // classes: PropTypes.object.isRequired,
};


export default
connect((mapStateToProps) => (mapStateToProps), dispatch => ({}))(PlayerControls);
