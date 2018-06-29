import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { withStyles } from '@material-ui/core/styles';
// import { withRouter } from 'react-router-dom'
// import withSSR from '../../../components/withSSR';
// import Link from 'next/link'
import {Link} from '../../../routes'
// import Link from '../../../components/Link';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
// import Icon from 'material-ui/Icon';


import CountDown from '../../../components/CountDown/';
import RatingBar from '../../../components/RatingBar/';
import NumberFormat from 'react-number-format';
import {isBrowser, isMobile} from 'react-device-detect';

import s from './theme.scss'
import './theme.scss'

const styles = {

}

class ItemView extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }

    render() {
        const {classes, data, discountCode} = this.props
        const {countdown} = this.state

        // let routing_url = `/offer/${data.slug}`
        // if(discountCode) {
        //     routing_url = `${routing_url}${discountCode}/`
        // }

        return (
            <ul data-box className={s.itemBox}>
                <li data-li="preview">
                    {data.image_preview &&
                        <Link route='offer' params={{ slug: data.slug }}>
                            <img src={data.image_preview} />
                        </Link>
                    }
                </li>
                <li data-li="details">

                    <ul data-ul="header">
                        <li>
                            <Typography variant="title">
                                <Link route='offer' params={{ slug: data.slug }}>
                                  <a data-link>{data.title}</a>
                              </Link>
                            </Typography>
                            {typeof data.location == 'string' ?
                                <div data-el="location">
                                    <Icon>place</Icon>
                                    {data.location}
                                </div>
                            : ''}
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
                                data.bestprice && data.bestprice.price ?
                                    <ul>
                                        <li data-li="normalprice">
                                            <NumberFormat value={data.bestprice.price} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix='From € ' />
                                        </li>
                                    </ul>
                                : ''
                            }
                        </li>
                    </ul>

                    <p data-el="description">
                        {data.description_short}
                    </p>


                    <ul className={s.reviewsRating}>
                        <li>
                            <RatingBar rating={data.reviews.rating} />
                        </li>
                        <li>
                            <Link route='offer' params={{ slug: data.slug }} data-link>
                              <a data-link>
                                <NumberFormat value={data.reviews.counter} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix='' /> reviews
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
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemView);
