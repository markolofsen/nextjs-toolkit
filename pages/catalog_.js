import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { format } from 'url'

import withRoot from '../utils/withRoot';
import NavWrapper from './NavWrapper/';
// import Helmet from 'react-helmet'

import { withI18next } from '../lib/withI18next'
import axios from 'axios';
// import Link, { prefetch } from '../components/link'
// import {Link} from '../routes'
import ItemView from './Catalog/ItemView/';
import s from './theme.scss';

@withI18next(['cat'])
class Article extends Component {
  static async getInitialProps ({ req, query, pathname, isVirtualCall }) {
    const url = format({ pathname, query })

    // fetch data as usual
    const offers = await axios.get(`http://127.0.0.1:8000/api/catalog/tickets/list/${query.folder}/?page=1`).then(res => {
      return res.data.results
    });

    const props = { offers }

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
            {t('Catalog')}
            <ul className={s.test}>
              <li>1</li>
              <li>1</li>
            </ul>
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
