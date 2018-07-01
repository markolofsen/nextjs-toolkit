import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { format } from 'url'

import withRoot from '../utils/withRoot';
import { withI18next } from '../lib/withI18next'

import Typography from '@material-ui/core/Typography';
import NavWrapper from './NavWrapper/';
import ItemView from './Catalog/ItemView/';

import axios from 'axios';

// import Link, { prefetch } from '../components/link'
// import {Link} from '../routes'
import {get} from '../data/config';

@withI18next(['cat'])
class Article extends Component {
  static async getInitialProps ({ req, query, pathname, isVirtualCall }) {
    const url = format({ pathname, query })

    // fetch data as usual
    const pageNumber = typeof query.pagination !== 'undefined' ? query.pagination : 1;
    const offers = await get(`/api/catalog/tickets/list/${query.folder}/?page=${pageNumber}`)

    const props = { offers: offers.results, pageNumber }

    return props
  }

  render () {
    const { i18n, t, offers } = this.props

    return (
      <div>
        <NavWrapper
          _i18n={i18n}
          _title={t('Catalog')}
          _meta={[{ property: 'og:title', content: 'Catalog' }]} >
          <div data-content>
            <Typography variant="display1" gutterBottom>
              {t('Catalog')}
            </Typography>
            {this.props.pageNumber}
            {offers.map((item, index) => (
              <ItemView data={item} key={index} />
            ))}
          </div>
        </NavWrapper>
      </div>
    )
  }
}



export default withRoot(Article);
