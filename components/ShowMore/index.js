// @flow weak

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'
// import { withRouter } from 'react-router-dom'
import Collapse from '@material-ui/core/Collapse';
import { translate } from 'react-i18next'




@withStyles(styles)
@translate('cat')
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
		const {t, classes, text, height} = this.props

		let height_ = height
			? height
			: 120

		if (text.length < 300) {
			return (
				<div className={classes.contentFormat}>
					<div dangerouslySetInnerHTML={{
						__html: text
					}}/>
				</div>
			)
		}
		return (
			<div>
				<div className={classes.contentFormat}>
					<Collapse in={open} collapsedHeight={`${height_}px`}>
						<div className={classes.contentFormat} dangerouslySetInnerHTML={{
							__html: text
						}}/>
					</Collapse>

					<div data-el="more">
						<span onClick={this.switcher}>
							{t('Read more')}
						</span>
					</div>
				</div>
			</div>
		)
	}
}

Block.propTypes = {
	// classes: PropTypes.object.isRequired,
	text: PropTypes.string.isRequired
};

export default Block;
