import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import { withStyles } from '@material-ui/core/styles';
// import { withRouter } from 'react-router-dom'
// import withSSR from '../../../components/withSSR';
// import Link from 'next/link'
import {Link} from '../../../routes'
// import { I18n } from '../../i18n'
import { translate } from 'react-i18next'

// import Link from '../../../components/Link';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
// import Icon from 'material-ui/Icon';

import { observer } from 'mobx-react'
import store from '../../../data/store'
// import {language} from '../../data/config'

import CountDown from '../../../components/CountDown/';
import RatingBar from '../../../components/RatingBar/';
import NumberFormat from 'react-number-format';
import {isBrowser, isMobile} from 'react-device-detect';

// import s from './theme.scss'
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'

// const styles = theme => (
@translate('cat')
@observer
@withStyles(styles)
class ItemView extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }

    render() {
        const {t, data, discountCode, classes} = this.props
        const {countdown} = this.state

        // let routing_url = `/offer/${data.slug}`
        // if(discountCode) {
        //     routing_url = `${routing_url}${discountCode}/`
        // }

        return (
            <ul data-box className={classes.itemBox}>
                <li data-li="preview">
                  {data.image_preview &&
                    <Link route='offer' params={{ lang: store.language, slug: data.slug }}>
                      <a><img src={data.image_preview} /></a>
                    </Link>}
                </li>
                <li data-li="details">

                    <ul data-ul="header">
                        <li>
                            <Typography variant="title">
                              <Link route='offer' params={{ lang: store.language, slug: data.slug }}>
                                  <a data-link>{data.title}</a>
                              </Link>
                            </Typography>
                            <div data-el="location">
                                <Icon>place</Icon>
                                {data.locations[0]}
                            </div>
                        </li>
                        <li data-li="price">
                            {data.bestprice && data.bestprice.price_discount ?
                                <ul>
                                    {isBrowser && data.discount_date &&
                                        <li data-li="countdown">
                                            <CountDown date={data.discount_date} />
                                        </li>}

                                    <li data-li="discount">
                                        <NumberFormat value={data.bestprice.price_discount} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix='From € ' />
                                        <span> instead </span>
                                        <NumberFormat value={data.bestprice.price} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix='€ ' />
                                    </li>
                                </ul>
                            :
                                data.bestprice ?
                                    <ul>
                                        <li data-li="normalprice">
                                            <NumberFormat value={data.bestprice} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix={`${t('From')} €`} />
                                        </li>
                                    </ul>
                                : ''
                            }
                        </li>
                    </ul>

                    <p data-el="description">
                        {data.description_short}
                    </p>

                    <ul data-el="reviewsRating">
                        <li>
                            <RatingBar rating={0} />
                        </li>
                        <li>
                            <Link route='offer_reviews' params={{ lang: store.language, slug: data.slug }}>
                              <a data-link>
                                {t('Reviews')}
                              </a>
                            </Link>
                        </li>
                    </ul>

                </li>
            </ul>
        )
    }
}

ItemView.propTypes = {
  // classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default ItemView;
