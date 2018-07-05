import {Component} from 'react'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'
import {Link} from '../../routes'
import Preloader from '../Preloader'

import BottomScrollListener from 'react-bottom-scroll-listener';
import { observer } from 'mobx-react'
import store from '../../data/store'

const _ = require('lodash');


function range(min, max, delta) {

	min = Number(min)
	max = Number(max)

	// create array
	// xah_range(n) creates a array from 1 to n, including n.
	// xah_range(m,n) creates a array from m to n, including n.
	// xah_range(n,m,delta) creates a array from n to m, by step of delta. May not include m
	// version 2016-10-22 http://xahlee.info/js/javascript_range_array.html

	var arr = [];
	var myStepCount;

	if (arguments.length === 1) {
		for (var ii = 0; ii < min; ii++) {
			arr[ii] = ii + 1;
		};
	} else {
		if (arguments.length === 2) {
			myStepCount = (max - min);
			for (var ii = 0; ii <= myStepCount; ii++) {
				arr.push(ii + min);
			};
		} else {
			myStepCount = Math.floor((max - min) / delta);
			for (var ii = 0; ii <= myStepCount; ii++) {
				arr.push(ii * delta + min);
			};
		}
	}

	return arr;

}


@observer
@withStyles(styles)
class Paginator extends Component {

	constructor(props) {
    super(props);
    this.state = {
      pages_arr: [],
			paginator_visible: true,
			preloader: false,
    }

    this.scrollCallback = this.scrollCallback.bind(this);
  }

	componentDidMount() {
		const {pagesCurrent, pagesTotal} = this.props
		let pages_arr = range(1, pagesTotal)
				pages_arr = pages_arr.filter(e => e !== pagesCurrent)

			this.setState({pages_arr})
	}

	async scrollCallback() {
		
		const {loadMore, loadMoreParams} = this.props
		const {pages_arr, preloader} = this.state

		if(typeof loadMore !== 'undefined') {

			this.setState({paginator_visible: false})

			if(pages_arr.length > 0 && !preloader) {
				this.setState({preloader: true})

				const page = pages_arr[0]
				this.setState({pages_arr: pages_arr.slice(1)})
				await loadMore({...loadMoreParams, page}).then(res => {
					this.setState({preloader: false})
					return res
				})
			}
		}
	}


	render() {
		const {classes, pagesTotal, pagesCurrent, route, params} = this.props
		const {paginator_visible, preloader} = this.state

		if(pagesTotal == 1) {
			return <div />
		}
		return (
			<div className={classes.pagination}>
				{paginator_visible &&
				<ul>
					{range(1, pagesTotal).map((item, index) => {
						return (
							<li key={index} data-selected={pagesCurrent == item}>
								<Link route={route}
									params={{...params, pagination: item}}>
									<a data-link>{item}</a>
								</Link>
							</li>
						)
					})}
				</ul>}

				{preloader && <Preloader />}

				<BottomScrollListener onBottom={this.scrollCallback} offset={200} debounce={10} />
			</div>
		)
	}
}

Paginator.propTypes = {
	// classes: PropTypes.object.isRequired,
	pagesTotal: PropTypes.number.isRequired,
	pagesCurrent: PropTypes.number.isRequired,
	params: PropTypes.object.isRequired,
	route: PropTypes.string.isRequired,
	// loadMore: PropTypes.func.isRequired,
	// loadMoreParams: PropTypes.object.isRequired,
};

export default Paginator
