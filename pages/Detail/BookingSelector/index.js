import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Icon from '@material-ui/core/Icon';

import NumberFormat from 'react-number-format';
const _ = require('lodash');

import s from './theme.scss'


const styles = theme => ({
	paper: {
		height: 'auto',
	  maxHeight: 'auto',
	  overflow: 'auto',
	  width: 305
	},
})

class SimplePopover extends React.Component {
	state = {
		anchorEl: null
	};

	componentDidMount() {
		const {data} = this.props
		data.map((item, index) => {
			this.setState({
				[item.state]: item.default_amount
			})
		})

		this.props.onRef(this)
	}

	componentWillUnmount() {
		this.props.onRef(undefined)
	}

	getState() {

		const {data} = this.props

		let prices_arr = []
		_.keys(this.state).map((item, index) => {
			data.map((dat, i) => {
				if (item == dat.state) {
					let model = dat
					model.value = this.state[item]
					model.total = this.state[item] * dat.price
					prices_arr.push(model)
				}
			})
		})
		return prices_arr

	}

	handleClick = event => {
		this.setState({anchorEl: event.currentTarget});
	};

	handleClose = () => {
		this.setState({anchorEl: null});
	};

	// getState() {
	//     return this.state
	// }

	changeAmount = (state, type) => {

		let value = this.state[state]
		if (type == 'up') {
			value++
		} else {
			value--
		}

		if (value < 0) {
			value = 0
		}
		// if(state == 'adults' && value <= 0) {
		//     value = 1
		// }

		this.setState({[state]: value})

	}

	renderButtons(state) {
		return (
			<ul data-ul="buttons">
				<li onClick={() => this.changeAmount(state, 'down')}>
					<Icon>remove</Icon>
				</li>
				<li>
					{this.state[state]}
				</li>
				<li onClick={() => this.changeAmount(state, 'up')}>
					<Icon>add</Icon>
				</li>
			</ul>
		)
	}

	renderPopoverContent() {

		const {data} = this.props

		// console.log(data)

		return (
			<div>
				<div className={s.popover}>

					{data.map((item, index) => {
						return (
							<ul data-ul="block" key={index}>
								<li>
									<label>
										<span data-el="label">{item.label}</span>
										{item.discount_price
											? <span data-el="price" data-color="danger">
													<NumberFormat value={item.discount_price
														? item.discount_price
														: 0} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix='€ '/>
													<span data-margin>instead</span>
													<NumberFormat value={item.price
														? item.price
														: 0} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix='€ '/>
												</span>
											: <span data-el="price">
												(<NumberFormat value={item.price
												? item.price
												: 0} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix='€ '/>)
											</span>
}
									</label>
									<small>{item.subtitle}</small>
								</li>
								<li>
									{this.renderButtons(item.state)}
								</li>
							</ul>
						)
					})}

				</div>
			</div>
		)
	}

	render() {
		const {classes, data, addon} = this.props;
		const {anchorEl} = this.state;

		// const {max_guest, age_children, age_infants} = this.props
		// const {adults, children, infants} = this.state

		let peoples = 0
		let peoples_price = 0
		let infants = 0

		data.map((item, index) => {
			let a = this.state[item.state]
			if (!item.infants_type) {
				peoples += a
				let item_price = item.discount_price
					? item.discount_price
					: item.price
				peoples_price += (item_price * a)
			} else {
				infants += a
			}
		})

		return (
			<div>

				<ul className={s.input} onClick={this.handleClick}>
					{peoples > 0 && <li>{peoples} {addon},
						<NumberFormat value={peoples_price} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix=' = € '/>
					</li>}

					{infants > 0 && <li>{infants}
						infants</li>}
				</ul>

				<Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={this.handleClose} anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}} transformOrigin={{
					vertical: 'top',
					horizontal: 'left'
				}} classes={{
					paper: classes.paper
				}}>
					<Typography className={s.typography}>
						Manage your booking
					</Typography>
					{this.renderPopoverContent()}
				</Popover>
			</div>
		);
	}
}

SimplePopover.propTypes = {
	classes: PropTypes.object.isRequired,
	data: PropTypes.array.isRequired,
	addon: PropTypes.string.isRequired
};

export default withStyles(styles)(SimplePopover);
