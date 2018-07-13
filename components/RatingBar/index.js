import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Icon from '@material-ui/core/Icon';



import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'


@withStyles(styles)
class Block extends Component {

    render() {

        const {classes, rating, size} = this.props

        // if(rating == false) {
        //     return <div />
        // }
        return (
            <ul className={classes.ratingWrapper} data-size={size}>
                <li data-li="star">
                    {rating <= 1 ? <Icon>star_border</Icon> : ''}
                    {rating > 1 && rating < 4 ? <Icon>star_half</Icon> : ''}
                    {rating >= 4 ? <Icon>star</Icon> : ''}
                </li>
                <li data-li="text">{parseFloat(rating).toFixed(1)}</li>
            </ul>
        )

        // if(!rating && rating != 0) {
        //     return <div />
        // }
        //
        // const stars = Array(rating).keys();
        // const stars_borders = Array(5-rating).keys();
        //
        // return (
        //     <div className={theme.ratingWrapper} data-size={size}>
        //         <ul>
        //             {[...Array.from(stars)].map((item, index) => {
        //                 return (
        //                     <li key={index}><Icon>star</Icon></li>
        //                 )
        //             })}
        //             {[...Array.from(stars_borders)].map((item, index) => {
        //                 return (
        //                     <li key={index}><Icon>star_border</Icon></li>
        //                 )
        //             })}
        //         </ul>
        //         <span>{rating.toFixed(1)}</span>
        //     </div>
        // )
    }
}

Block.propTypes = {
  // classes: PropTypes.object.isRequired,
  rating: PropTypes.number.isRequired,
};

export default Block;
