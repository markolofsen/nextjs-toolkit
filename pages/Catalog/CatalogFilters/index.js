import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Link} from '../../../routes'
// import { translate } from 'react-i18next'

// import Button from '@material-ui/core/Button';
// import Icon from '@material-ui/core/Icon';
// import Typography from '@material-ui/core/Typography';

import { observer } from 'mobx-react'
import store from '../../../data/store'


// import RatingBar from '../../../components/RatingBar/';

import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'



// const styles = theme => (
// @translate('cat')
@observer
@withStyles(styles)
class CatalogFilters extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        const {t, classes, data, lang, currentSlug} = this.props

        return (
            <div>
              <ul className={classes.categoriesWrapper}>
                {data.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link route='catalog' params={{ lang: lang, folder: item.slug }}>
                        <a data-selected={currentSlug == item.slug}>
                          {t(item.name)}
                        </a>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
        )
    }
}

CatalogFilters.propTypes = {
  // classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  lang: PropTypes.string.isRequired,
  currentSlug: PropTypes.string.isRequired,

};

export default CatalogFilters;
