import {Component} from 'react'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'
import {Link} from '../../routes'

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
	render() {
		const {classes, page, route, params} = this.props

		return (
			<div>
				<ul className={classes.pagination}>
					{range(1, page.pages).map((item, index) => {
						// const _params = _.merge(params, {pagination: item})

						return (
							<li key={index} data-selected={page.current == item}>
								<Link route={route}
									params={{
										lang: params.lang,
										folder: params.folder,
										pagination: item,
									}}>
									<a data-link>{item}</a>
								</Link>
							</li>
						)
					})}
				</ul>
			</div>
		)
	}
}

Paginator.propTypes = {
	// classes: PropTypes.object.isRequired,
	page: PropTypes.object.isRequired,
	params: PropTypes.object.isRequired,
	route: PropTypes.string.isRequired,
};

export default Paginator
