import React, {Component} from 'react'

// import axios from 'axios';
import { format } from 'url'
import {get} from '../data/config';

import { withI18next } from '../lib/withI18next'
import withRoot from '../utils/withRoot';
import Detail from './Detail/';
import NavWrapper from './NavWrapper/';
import Breadcrumbs from '../components/Breadcrumbs/';

@withI18next(['home', 'common'])
class Offer extends Component {

  static async getInitialProps ({ req, query, pathname, isVirtualCall }) {
    const url = format({ pathname, query })

    // fetch data as usual
    const data = await get(`/api/catalog/tickets/detail/${query.slug}/0/?lang=${query.lang}`).then(res => res.results)
    const props = { data: data, query }
    return props
  }

  render () {
    const { i18n, data, query, url } = this.props

    if (!data) return <h1>Post not found</h1>

    // return <h1>{offer.system_name}</h1>
    return (
      <NavWrapper
        _query={query}
        _url={url}
        _i18n={i18n}
        _title={data.title}
        _meta={[{ property: 'og:title', content: data.title }]} >
        <div>
          <Breadcrumbs
            lang={query.lang}
            data={data.breadcrumbs} />
          <Detail data={data} query={query} i18n={i18n}/>
        </div>
      </NavWrapper>
    )


  }
}



export default withRoot(Offer);
