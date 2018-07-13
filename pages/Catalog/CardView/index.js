import React, {Component} from 'react';
import PropTypes from 'prop-types';


import L, {Link} from '../../../routes'
import {translate} from 'react-i18next'
import {get} from '../../../data/config';
import { observer } from 'mobx-react'
import store from '../../../data/store'

import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'

import Icon from '@material-ui/core/Icon';
import NumberFormat from 'react-number-format';


@translate('cat')
@withStyles(styles)
@observer
class Cardiew extends Component {

	constructor(props) {
		super(props);
		this.state = {
      data: []
    };
	}

	componentDidMount() {

    if(typeof window !== 'undefined') {
      get(`/api/catalog/tickets/random/3/?lang=${store.language}`).then(res => {
        this.setState({data: res.results})
        // console.log(res.results)
      })
    }
  }

  pushLocation(slug) {
    window.scrollTo(0, 0)

    let saveRoute = L.Router.router.route.split('/')[1]
    let saveParams = L.Router.router.query
        saveParams.slug = slug
    L.Router.pushRoute(saveRoute, saveParams)

  }

	render() {
		const {t, classes} = this.props
    const {data} = this.state

		return (
			<div>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className={classes.wrapper}
              style={{
                backgroundImage: `url(${item.preview})`
              }}
              >
              <ul data-ul="imgOverlay" onClick={() => this.pushLocation(item.slug)}>
                <li>
                  <span data-css="normalprice">
                    <NumberFormat value={item.bestprice} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix={`${t('From')} €`} />
                  </span>
                </li>
                <li>
                  <span data-css="location">
                    <Icon>place</Icon> {item.locations[0]}
                  </span>

                  <span data-css="title">
                    <Link route='offer' params={{ lang: store.language, slug: item.slug }}>
                      <a>
                        {item.title}
                      </a>
                    </Link>
                  </span>
                </li>
              </ul>
            </div>
          )
        })}
      </div>
		)
	}
}

Cardiew.propTypes = {
	// classes: PropTypes.object.isRequired,
	// data: PropTypes.object.isRequired,
};

export default Cardiew;
