import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {withStyles} from '@material-ui/core/styles';
// import { withRouter } from 'react-router-dom'
// import {Link} from 'react-router-dom';
// import Link from '../../../components/Link';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
// import { findDOMNode } from 'react-dom'
import {isBrowser, isMobile} from 'react-device-detect';

import Preloader from '../../components/Preloader/'
import ShowMore from '../../components/ShowMore/'
import TimeAgo from 'react-timeago';
import NumberFormat from 'react-number-format';
// import {apiCatalogTicketsDetail, apiCatalogRentalsBooking} from '../../../../utils/functions'
// import DatePicker from './DatePicker'
// import FormField from '../../../BlockForm/FormField'
// import FormButton from '../../../BlockForm/FormButton'
// import GoogleMap from '../../../components/GoogleMap/'
import GalleryModal from '../../components/GalleryModal/'
import Player from '../../components/Player/'
import RatingBar from '../../components/RatingBar/';

// import BookingSelector from './BookingSelector/'
// import ProfileBlock from '../../Profile/ProfileBlock'
import Tickets from './Tickets/'

import s from './theme.scss'

class ReviewsList extends Component {

	constructor(props) {
		super(props);
		this.scrollToBottom = this.scrollToBottom.bind(this);
		this.state = {
			scroll: 1
		}
	}

	scrollToBottom = () => {
		// const reviewsContainer = findDOMNode(this.reviewsContainer);
		// reviewsContainer.scrollTop = this.state.scroll
		//
		// let scroll_new = this.state.scroll + 1
		//
		// if(this.state.scroll > 0 && scroll_new < reviewsContainer.scrollHeight) {
		//     this.setState({scroll: scroll_new })
		//
		//     setTimeout(() => {
		//         this.scrollToBottom()
		//     }, 10)
		// }

	};

	componentDidMount() {
		const {data} = this.props

		if (isBrowser && data.data.length > 15) {
			this.scrollToBottom();
		}
	}

	componentDidUpdate() {
		// this.scrollToBottom();
	}

	stopScroll = () => {
		this.setState({scroll: 0})
	}

	render() {

		const {data} = this.props

		if (!data.rating) {
			return <div/>
		}


		return (
			<div className={s.reviewsWrapper}>

				<ul className={s.reviewsTop}>
					<li><RatingBar rating={data.rating} size="lg"/></li>
					<li>{data.counter}
						reviews</li>
				</ul>

				<div className={s.reviewsList} ref={(el) => {
					this.reviewsContainer = el;
				}} onMouseEnter={this.stopScroll}>
					{data.data.map((item, index) => {
						return (
							<div key={index} data-block="review">
								<ul data-list="header">
									{item.avatar && <li data-li="avatar">
										<img src={item.avatar}/>
									</li>}
									<li data-li="userdata">
										<ul>
											<li>
												<Typography variant="body2">
													{item.username}
												</Typography>
												<div data-el="location">{item.location}</div>
												<RatingBar rating={item.rating} size="xs"/>
											</li>
											<li data-li="date">
												{item.rating_date && <TimeAgo date={item.rating_date}/>}
											</li>
										</ul>
									</li>
								</ul>

								<ul data-list="content">
									<li data-li="title">{item.title}</li>
									<li data-li="text">{item.text}</li>
								</ul>
							</div>
						)
					})}
				</div>

			</div>
		)
	}
}

class PagePropertyDetail extends Component {

	state = {
		// data: false,
		startDate: false,
		endDate: false,
		totalDays: 0,
		totalPrice: 0,
		totalEconomy: 0,

		booking_email: '',
		errors: {
			booking_email: false
		},

		booking_disabled: false,
		booking_status: false,

		allow_video: false,
		render: false,
	}

	componentDidMount() {

		this.setState({render: true})

		// const params = this.props.match.params
		// const offer_id = params.slug
		// const discount_code = params.discount_code ? params.discount_code : 0

		// apiCatalogTicketsDetail(offer_id, discount_code).then(res => {
		//     if(!res.data.error) {
		//         this.setState({data: res.data.results})
		//     }
		//     // console.log(this.state.data)
		// })
		// this.setState({data: this.props.data})
	}

	datePickerCallback = (arr) => {
		const {data} = this.props

		// console.log(arr)
		this.setState({totalDays: arr.totalDays, startDate: arr.startDate, endDate: arr.endDate})

		let totalDays = arr.totalDays

		if (data.prices) {
			let rows = _.sortBy(data.prices, ['duration']).reverse();
			console.log(rows)
			let price = 0
			let economy = 0
			for (let i = 0; i <= rows.length; i++) {
				if (totalDays >= rows[i].duration) {
					price = rows[i].price
					economy = rows[i].economy
					break
				}
			}
			let totalPrice = price * totalDays
			let totalEconomy = economy * totalDays
			this.setState({totalPrice, totalEconomy})
			// console.log(price)
			// rows.map((item, index) => {
			//
			// })
		}

	}

	// submitBookingForm = (event) => {
	//     event.stopPropagation()
	//     event.preventDefault()
	//
	//     const {totalDays, totalPrice, totalEconomy, startDate, endDate, booking_email} = this.state
	//
	//     const post = {
	//         offerId: this.props.match.params.id,
	//         totalDays,
	//         totalPrice,
	//         totalEconomy,
	//         startDate,
	//         endDate,
	//         booking_email,
	//         persons: this.refBookingSelector.getState()
	//     }
	//
	//     this.setState({booking_disabled: true})
	//     apiCatalogRentalsBooking(post).then(res => {
	//         console.log(res)
	//         if(!res.data.error) {
	//             this.setState({booking_status: true})
	//         }
	//         this.setState({booking_disabled: false})
	//     })
	//
	//     // console.log(post)
	// }

	// handleChangeInput = (event, name) => {
	//     this.setState({
	//         [name]: event.target.value,
	//     });
	// };

	renderBookingForm() {
		const {data} = this.props
		const {render} = this.state

		if(!render) {
			return <div />
		}


		return (
			<Tickets data={data.prices} offerId={data.id} />
		)
	}

	renderDetails() {
    const {data} = this.props

		if (!data.description) {
			return <div/>
		}
		return (
			<div className={s.offerDescription}>
				<ShowMore text={data.description} height={150}/>
			</div>
		)
	}

	openGallery = () => {
		this.setState({allow_video: false})
		this.refGalleryModal.handleClickOpen()
	}

	playVideo = (event) => {
		event.stopPropagation()
		event.preventDefault()
		this.setState({allow_video: true})
	}

	renderImagePanorama() {
		const {allow_video} = this.state
    const {data} = this.props

		let images = []
		if (data.images) {
			data.images.map((image, index) => {
				images.push({original: image.normal, thumbnail: image.thumb})
			})
		}

		if (!data.image_panorama) {
			return <div/>
		}

		return (
			<div>
				{allow_video
					? <Player className={s.videoPanorama} autoPlay={allow_video} url={data.video}/>
					: <div style={{
						backgroundImage: `url(${data.image_panorama})`
					}} className={s.imagePanorama} onClick={this.openGallery}/>}

				{images && <GalleryModal images={images} onRef={ref => (this.refGalleryModal = ref)}/>}

				<div className={allow_video
					? s.galleryButtonsVideo
					: s.galleryButtons}>
					<Button variant="contained" onClick={this.openGallery}>
						<Icon>photo_camera</Icon>
						Show photos
					</Button>
					{data.video && <Button variant="contained" onClick={(event) => this.playVideo(event)}>
						<Icon>play_arrow</Icon>
						Play video
					</Button>}
				</div>

			</div>
		)
	}

	render() {
		const {data, reviews} = this.props

		// if (!data) {
		// 	return <Preloader/>
		// }

		return (
			<div className={s.offerWrapper}>

				<div>{this.renderImagePanorama()}</div>

				<div data-content-inner>

					<ul className={s.contentWrapper}>
						<li data-li="left">

							<ul className={s.contentHeader}>
								<li>
									{data.categories.map((category, c) => {
										return (
											<span key={c}>
												<strong index={c}>{category.label}</strong>
												{c < data.categories.length - 1 && ', '}
											</span>
										)
									})}
								</li>
								<li>
									<Typography variant="display1">
										{data.title}
									</Typography>
								</li>

								{data.location && <li data-li="location">
									<Icon>place</Icon>
									{data.location.city}
								</li>}

								{this.renderDetails()}

								{this.renderBookingForm()}

							</ul>


						</li>
						<li data-li="right">
							<ReviewsList data={data.reviews}/>
						</li>
					</ul>

				</div>

			</div>
		)
	}
}

PagePropertyDetail.propTypes = {
	// classes: PropTypes.object.isRequired
};

export default withStyles(s)(PagePropertyDetail);
