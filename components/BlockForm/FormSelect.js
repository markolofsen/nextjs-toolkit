import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const styles = mui => ({
	formControl: {
		width: '100%',
		marginBottom: 10
	},
	formControlPadding: {
		width: '100%',
		marginBottom: 10,
		marginTop: 8,
	},
	fieldRoot: {
		padding: 0,
		'label + &': {
			marginTop: mui.spacing.unit * 3,
		},
		'& > svg': {
			margin: '0 15px 0 0',
		}
	},
	formControlLabel: {
		fontSize: 18,
		marginTop: -8,
	},
	fieldSelect: {
		boxSizing: 'inherit',
		borderRadius: 2,
		backgroundColor: mui.palette.common.white,
		border: '1px solid rgba(63, 81, 181, .2)',
		fontSize: 16,
		padding: '15px 20px 15px 20px',
		// width: 'calc(100% - 24px)',
		width: '100%',
		transition: mui.transitions.create(['border-color', 'box-shadow']),
		'&:focus': {
			borderColor: 'rgba(63, 81, 181, .5)',
			boxShadow: '0 0 0 0.2rem rgba(63, 81, 181,.25)',
			backgroundColor: mui.palette.common.white,
		}
	},
	// textFieldFormLabel: {
	//   fontSize: 18,
	// },
	// formHelper: {
	//     marginBottom: 10,
	// },
});

class ControlledOpenSelect extends React.Component {
	state = {
		value: '',
		open: false,
	};

	componentDidMount() {
		const {defaultValue} = this.props
		if (defaultValue) {
			this.setState({value: defaultValue})
		}

		if (this.props.onRef) {
			this.props.onRef(this)
		}
	}

	componentWillUnmount() {
		this.props.onRef(undefined)
	}

	getState() {
		return this.state.value
	}

	handleChange = e => {
        e.stopPropagation();
		this.setState({
			[e.target.name]: e.target.value
		});

		if(typeof this.props.onChange === 'function') {
			this.props.onChange(e.target.value)
		}
	};

	handleClose = (e) => {
		e.stopPropagation();
		this.setState({open: false});
	};

	handleOpen = (e) => {
		e.stopPropagation();
		this.setState({open: true});
	};

	render() {
		const {classes, options, defaultValue, state_name, label} = this.props;
		const error_id = `field-${state_name}-error`
        const field_id = `field-${state_name}`

		let defaultValue_ = defaultValue
			? defaultValue
			: 'None'

		return (
			<form autoComplete="off">
				<FormControl className={label ? classes.formControlPadding : classes.formControl}>
					{label && <InputLabel htmlFor={field_id}
						classes={{
							root: classes.formControlLabel,
						}} >{label}</InputLabel>}
					<Select
						open={this.state.open}
						onClose={this.handleClose}
						onOpen={this.handleOpen}
						value={this.state.value}
						onChange={this.handleChange}
						inputProps={{
							name: 'value',
							id: field_id
						}} classes={{
							root: classes.fieldRoot,
							select: classes.fieldSelect
						}}>
						<MenuItem value={defaultValue_}>
							<em>{defaultValue_}</em>
						</MenuItem>
						{options.map((item, index) => {
							return (
								<MenuItem key={index} value={item}>{item}</MenuItem>
							)
						})}
					</Select>
				</FormControl>
			</form>
		);
	}
}

ControlledOpenSelect.propTypes = {
	classes: PropTypes.object.isRequired,
	options: PropTypes.array.isRequired
};

export default withStyles(styles)(ControlledOpenSelect);
