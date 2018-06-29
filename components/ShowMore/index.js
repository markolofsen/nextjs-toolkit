// @flow weak

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
// import { withRouter } from 'react-router-dom'
import Collapse from '@material-ui/core/Collapse';

import s from './theme.scss'

class Block extends Component {

	state = {
		open: true
	}

	switcher = () => {
		this.setState({
			open: !this.state.open
		})
	}

  componentDidMount() {
    this.setState({open: false})
  }

	render() {

		const {open} = this.state
		const {text, height} = this.props

		let height_ = height
			? height
			: 120

		if (text.length < 300) {
			return (
				<div className={s.contentFormat}>
					<div dangerouslySetInnerHTML={{
						__html: text
					}}/>
				</div>
			)
		}
		return (
			<div>
				<div className={s.contentFormat}>
					<Collapse in={open} collapsedHeight={`${height_}px`}>
						<div className={s.contentFormat} dangerouslySetInnerHTML={{
							__html: text
						}}/>
					</Collapse>

					<div data-el="more">
						<span onClick={this.switcher}>
							Развернуть
						</span>
					</div>
				</div>
			</div>
		)
	}
}

Block.propTypes = {
	classes: PropTypes.object.isRequired,
	text: PropTypes.string.isRequired
};

export default withStyles(s)(Block);
