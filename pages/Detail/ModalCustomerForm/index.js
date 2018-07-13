import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import { withStyles } from '@material-ui/core/styles';
// import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core/Dialog';

import FormField from '../../../components/BlockForm/FormField'
import FormButton from '../../../components/BlockForm/FormButton'
// import {apiCatalogTicketsBooking, cookie} from '../../../../../utils/functions'

import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'

@withStyles(styles)
class Block extends Component {

	state = {
		open: false,

		data: false,

		email: '',
		name: '',
		phone: '',

		errors: {
			email: false,
			name: false,
			phone: false
		},

		form_complete: false
	}

	componentDidMount() {
		this.props.onRef(this)

		// let email = cookie('get','customer_email')
		// let name = cookie('get','customer_name')
		// let phone = cookie('get','customer_phone')

		// this.setState({
		// 	email: email ? email : '',
		// 	name: name ? name : '',
		// 	phone: phone ? phone : ''
		// })
	}

	componentWillUnmount() {
		this.props.onRef(undefined)
	}

	loadData(data) {
		this.handleClickOpen()
		this.setState({data: data})
	}

	handleClickOpen = () => {
		this.setState({open: true});
	};

	handleClose = () => {
		this.setState({open: false, form_complete: false});
	};

	handleChangeInput = (event, name) => {
		this.setState({[name]: event.target.value});
	};

	submitForm = (event, item) => {
		event.stopPropagation()
		event.preventDefault()

		const {data, email, name, phone} = this.state

		let post = {
			data,
			customer: {
				email,
				name,
				phone
			}
		}

		// cookie('set',['customer_email',email])
		// cookie('set',['customer_name',name])
		// cookie('set',['customer_phone',phone])

		// apiCatalogTicketsBooking(post).then(res => {
		//
		// 	if(!res.data.error && res.status == 200) {
		//         this.setState({form_complete: true})
		//     } else {
		//         alert('Something wrong! \n Please, contact us.')
		//         this.props.history.push("/p/support/")
		//     }
		// })
	}

	renderForm() {
    const {classes} = this.props

		return (
			<div>

				<DialogContentText>
					Please complete your order.
				</DialogContentText>

				<form onSubmit={(e) => this.submitForm(e)} className={classes.modalForm}>
					<ul>
						<li>
							<FormField state_value={this.state.name} state_name="name" placeholder="Name" type="text" required={true} disabled={false} error={this.state.errors.name} onChange={this.handleChangeInput}/>
						</li>
						<li>
							<FormField state_value={this.state.email} state_name="email" placeholder="Email Address" type="email" required={true} disabled={false} error={this.state.errors.email} onChange={this.handleChangeInput}/>
						</li>
						<li>
							<FormField state_value={this.state.phone} state_name="phone" placeholder="Phone" type="text" required={true} disabled={false} error={this.state.errors.phone} onChange={this.handleChangeInput}/>
						</li>

						<li>
							<FormButton disabled={false} type="submit" label="Confirm order" fullWidth/>
						</li>
					</ul>
				</form>
			</div>
		)
	}

	renderFormComplete() {
		const {classes} = this.props
		return (
			<div>
				<Typography>
					Your order has been successfully registered.<br/>
					We will get back to you within 1 hour
				</Typography>

				<div className={classes.modalFormCompleteButtons}>
					<Button variant="raised" color="primary" onClick={this.handleClose}>
						Close
					</Button>
				</div>
			</div>
		)
	}

	render() {
		const {open, form_complete} = this.state

		return <div/>

		// return (
		//   <div>
		//     <Dialog
		//       open={this.state.open}
		//       onClose={this.handleClose}
		//       aria-labelledby="form-dialog-title"
		//       maxWidth="xs"
		//     >
		//       <DialogTitle id="form-dialog-title">Confirmation</DialogTitle>
		//       <DialogContent>
		//
		//           {form_complete ? this.renderFormComplete() : this.renderForm()}
		//
		//       </DialogContent>
		//     </Dialog>
		//   </div>
		// );
	}

}

Block.propTypes = {
	// classes: PropTypes.object.isRequired,
};

export default Block;
