import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import {apiDomain} from '../../config/init'

import theme from './theme.scss'


class BlockForm extends Component {

	render() {

        const {bgid, title} = this.props

        let bg_url = `url(${apiDomain}/media/material-bgs/jpg/${bgid}.jpg)`

		return (
			<div>
                <div className={theme.formWrapper} style={{backgroundImage: bg_url}}>
                    <div data-el="inner">
                        <Typography variant="title" data-el="title">
	                        {title}
	                    </Typography>

                        {this.props.children}
                    </div>
                </div>
            </div>
		)
	}
}

BlockForm.propTypes = {
  bgid: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default BlockForm
