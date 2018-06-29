import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core/Dialog';

const _ = require('lodash');

import theme from './theme.scss'


class FormConfirmer extends Component {

	state = {
		open: false,
	}


	handleClose = () => {
		this.setState({ open: false });
	};

    handleOpen = () => {
		this.setState({ open: true });
	};

	handleConfirm = () => {
        this.setState({ open: false });
		this.props.onClick()
	}

	render() {

		const {title="Confirmation", description=false, buttonConfirm="Agree", buttonCancel="Disagree"} = this.props

		return (
			<div>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}>
					<DialogTitle>
						{title}
					</DialogTitle>
                    {description &&
    					<DialogContent>
    						<DialogContentText>
    							<div dangerouslySetInnerHTML={{__html: description}} />
    						</DialogContentText>
    					</DialogContent>
                    }
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							{buttonCancel}
						</Button>
						<Button onClick={this.handleConfirm} color="primary" variant="raised" autoFocus>
							{buttonConfirm}
						</Button>
					</DialogActions>
				</Dialog>
                <div onClick={this.handleOpen}>
                    {this.props.children}
                </div>
			</div>
		)
	}
}

FormConfirmer.propTypes = {
  onClick: PropTypes.func.isRequired,
  // title: PropTypes.string.isRequired,
  // description: PropTypes.string.isRequired,
  // buttonConfirm: PropTypes.string.isRequired,
  // buttonCancel: PropTypes.string.isRequired,
};

export default FormConfirmer
