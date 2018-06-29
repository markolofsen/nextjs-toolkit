// @flow weak

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import { withRouter } from 'react-router-dom'
// import {connect} from 'react-redux';

import { findDOMNode } from 'react-dom'
import screenfull from 'screenfull'
import ReactPlayer from 'react-player';

import PlayerControls from './playerControls';

import theme from './theme.scss'

const styles = {
};

class Block extends Component {

    state = {
		url: null,
		playing: false,
		volume: 0.8,
		muted: false,
		played: 0,
		loaded: 0,
		duration: 0,
		playbackRate: 1.0,
		loop: false,
    }

    componentDidMount() {
        this.setState({
            url: this.props.url,
            playing: this.props.autoPlay
        })
    }

	load = url => {
		this.setState({url, played: 0, loaded: 0})
	}
	playPause = () => {
		this.setState({
			playing: !this.state.playing
		})
	}
	toggleLoop = () => {
		this.setState({
			loop: !this.state.loop
		})
	}
	setVolume = value => {
		this.setState({
			...this.state,
			volume: parseFloat(value)
		});
	}
	toggleMuted = () => {
		this.setState({
			muted: !this.state.muted
		})
	}
	setPlaybackRate = checked => {
		this.setState({
			...this.state,
			playbackRate: checked
				? 3
				: 1
		});
	}
	onPlay = () => {
		this.setState({playing: true})
	}
	onPause = () => {
		this.setState({playing: false})
	}
	onSeekMouseDown = e => {
		this.setState({seeking: true})
	}
	onSeekChange = value => {
		this.setState({
			...this.state,
			played: parseFloat(value)
		});
		this.player.seekTo(parseFloat(value))
	}

	onSeekMouseUp = e => {
		this.setState({seeking: false})
		this.player.seekTo(parseFloat(e.target.value))
	}
	onProgress = state => {
		// We only want to update time slider if we are not currently seeking
		if (!this.state.seeking) {
			this.setState(state)
		}
	}
	onClickFullscreen = () => {
		screenfull.request(findDOMNode(this.player))
	}

	setPlayerTime = payload => {
		this.setState({playing: false})
		this.setState({seeking: false})
		this.player.seekTo(parseFloat(payload.player_time))
		this.setState({played: payload.player_time})
		this.setState({playing: true})
	}


	render() {

		const {
      url,
      played,
      duration,
      playing,
      muted,
      loop,
      volume,
      playbackRate
		} = this.state

        return (
            <div className={this.props.className}>
                <ReactPlayer
                  youtubeConfig={{
                      playerVars: {
                          showinfo: 0,
                          playerVars: {
                              fs: 1,
                              disablekb: 0,
                              showinfo: 0,
                          },
                          preload: true,
                      }
                  }}
                  controls={true}
                  className={theme.reactPlayer}
                  width='100%' height='100%'
                  url={url}
                  playing={playing}
                  loop={loop}
                  playbackRate={playbackRate}
                  volume={volume}
                  muted={muted}
                  onReady={() => console.log('onReady')}
                  onStart={() => console.log('onStart')}
                  onPlay={this.onPlay} onPause={this.onPause}
                  onBuffer={() => console.log('onBuffer')}
                  onSeek={e => console.log('onSeek', e)}
                  onEnded={() => this.setState({playing: loop})}
                  onError={e => console.log('onError', e)}
                  onProgress={this.onProgress}
                  onDuration={duration => this.setState({duration})}
                />

                {true == false ?
                <PlayerControls
                    state={this.state}
                    playPause={this.playPause}
                    onClickFullscreen={this.onClickFullscreen}
                    setPlaybackRate={this.setPlaybackRate}
                    toggleMuted={this.toggleMuted}
                    toggleLoop={this.toggleLoop}
                    setVolume={this.setVolume}
                    onSeekChange={this.onSeekChange}
                    />
                : ''}

            </div>
        )
	}
}

Block.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Block);
