import { Component } from 'react'
// import fetch from 'isomorphic-unfetch'
import { format } from 'url'

import withRoot from '../utils/withRoot';
import { withI18next } from '../lib/withI18next'

import Typography from '@material-ui/core/Typography';
import NavWrapper from './NavWrapper/';
import ItemView from './Catalog/ItemView';
import CatalogFilters from './Catalog/CatalogFilters';
import Paginator from '../components/Paginator/';
import ShowMore from '../components/ShowMore'
import Breadcrumbs from '../components/Breadcrumbs/';
import GoogleMap from '../components/GoogleMapCatalog';

import { Trans } from 'react-i18next'

// import Link, { prefetch } from '../components/link'
// import {Link} from '../routes'
import {get} from '../data/config';



async function fetcher(q) {
  return await get(`/api/catalog/tickets/list/${q.folder}/?page=${q.page}&lang=${q.lang}`).then(res => res)
}

@withI18next(['cat'])
class Article extends Component {




  static async getInitialProps ({ req, query, pathname, isVirtualCall }) {
    const url = format({ pathname, query })

    // fetch data as usual
    const pageNumber = typeof query.pagination !== 'undefined' ? query.pagination : 1;
    const data = await fetcher({
      folder: query.folder,
      page: pageNumber,
      lang: query.lang
    })

    const props = { data, query, pageNumber, url }

    return props
  }

  constructor(props) {
    super(props);
    this.state = {
      data_extended: [],
      path_reload: false,
    }

    this.loadMore = this.loadMore.bind(this);
  }


  async loadMore(q) {
    let {data_extended} = this.state
    let data = await fetcher(q).then(res => {
      res.results.map(item => { data_extended.push(item) })
    })
    this.setState({data_extended})

    return true
  }


  UNSAFE_componentWillReceiveProps(nextProps) {
    if(typeof nextProps !== 'undefined') {
      if(nextProps.url.asPath != this.props.url.asPath) {
        this.setState({data_extended: [], path_reload: true}, () => {
          this.setState({path_reload: false})
        })
      }
    }
	}


  // componentDidMount() {
  //   get(`/api/catalog/tickets/list/water-sports/?page=1&lang=es`).then(res => {
  //     console.log('===========')
  //     console.log(res)
  //   })
  // }


  render () {
    const { i18n, t, data, query, url, pageNumber } = this.props
    const {data_extended, path_reload} = this.state

    const catalog_title = `${t(data.meta.title)} ${t('catalog_postfix')}`

    return (
      <div>
        <NavWrapper
          _query={query}
          _url={url}
          _i18n={i18n}
          _title={catalog_title}
          _meta={[
            { property: 'og:title', content: catalog_title },
            { property: 'og:description', content: data.meta.description_short },
          ]} >

          <div>
            {data.meta.breadcrumbs && <Breadcrumbs
              lang={query.lang}
              data={data.meta.breadcrumbs} /> }

            <GoogleMap lang={query.lang} />

            <div data-content>
              <Typography variant="display1" gutterBottom>
                 {catalog_title}
              </Typography>

              <ShowMore text={data.meta.description_full} height={60}/>

              {data.meta.categories &&
                <CatalogFilters
                  t={t}
                  currentSlug={query.folder}
                  lang={query.lang}
                  data={data.meta.categories} />}


             {data.results.map((item, index) => (
                <ItemView data={item} key={index} />
              ))}

              {/* ADDITIONAL ITEMS */}
              {data_extended.map((item, index) => (
                <ItemView data={item} key={index} />
              ))}

              {!path_reload && <Paginator
                pagesTotal={Number(data.page.pages)}
                pagesCurrent={Number(data.page.current)}
                route='catalog'
                params={{ lang: query.lang, folder: query.folder }}
                loadMore={this.loadMore}
                loadMoreParams={{
                  folder: query.folder,
                  lang: query.lang
                }}
               />}

            </div>
          </div>
        </NavWrapper>
      </div>
    )
  }
}



export default withRoot(Article);
