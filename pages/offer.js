import React, {Component} from 'react'

import axios from 'axios';
import { format } from 'url'


import { withI18next } from '../lib/withI18next'
import withRoot from '../utils/withRoot';
import Detail from './Detail/';
import NavWrapper from './NavWrapper/';

const posts = [
  { slug: 'hello-world', title: 'Hello world)' },
  { slug: 'another-blog-post', title: 'Another blog post' }
]


@withI18next(['home', 'common'])
class Offer extends Component {
  static async getInitialProps ({ req, query, pathname, isVirtualCall }) {
    // const post = posts.find(post => post.slug === query.slug)
    //
    // if (!post && res) {
    //   res.statusCode = 404
    // }
    //
    const url = format({ pathname, query })

    // if we're not running server side
    // get the props from sessionStorage using the pathname + query as key
    // if we got something return it as an object
    if (!req) {
      const props = window.sessionStorage.getItem(url)
      if (props) {
        return JSON.parse(props)
      }
    }

    const offer = await axios.get(`http://127.0.0.1:8000/api/catalog/tickets/detail/${query.slug}/0/`).then(res => {
      return res.data.results
    })
    // let offer = query.slug
    const props = { offer }
    // console.log(query.slug)
    // if the method is being called by our Link component
    // save props on sessionStorage using the full url (pathname + query)
    // as key and the serialized props as value
    if (isVirtualCall) {
      window.sessionStorage.setItem(url, JSON.stringify(props))
    }

    return props
  }

  render () {
    const { i18n, offer } = this.props

    console.log(offer)

    if (!offer) return <h1>Post not found</h1>

    // return <h1>{offer.system_name}</h1>
    return (
      <NavWrapper
        _i18n={i18n}
        _title={offer.title}
        _meta={[{ property: 'og:title', content: offer.title }]} >
        <Detail data={offer} />
      </NavWrapper>
    )


  }
}



export default withRoot(Offer);
