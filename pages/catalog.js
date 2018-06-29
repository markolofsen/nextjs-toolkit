import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { format } from 'url'

import withRoot from '../utils/withRoot';
import NavWrapper from './NavWrapper/';
import Helmet from 'react-helmet'

import { withI18next } from '../lib/withI18next'
import axios from 'axios';

@withI18next(['home', 'common'])
class Article extends Component {
  static async getInitialProps ({ req, query, pathname, isVirtualCall }) {
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

    // fetch data as usual
    const article = await axios.get('http://127.0.0.1:8000/api/catalog/tickets/list/false/?page=1').then(res => {
      return res.data.results
    });


    const comments = await fetch(
      `https://jsonplaceholder.typicode.com/posts/1/comments`
    ).then(response => response.json())

    const props = { article, comments }

    // if the method is being called by our Link component
    // save props on sessionStorage using the full url (pathname + query)
    // as key and the serialized props as value
    if (isVirtualCall) {
      window.sessionStorage.setItem(url, JSON.stringify(props))
    }

    return props
  }



  render () {
    const { i18n, article, comments } = this.props

    // console.log('——————')
    // console.log(this.props.i18n.languages[0])

    return (
      <div>
        <NavWrapper
          _i18n={i18n}
          _title={`Catalog!`}
          _meta={[{ property: 'og:title', content: 'Catalog!' }]}
          >
          <div data-content>

            <ul>
              {article.map(item => (
                <li key={item.id}>
                  <br />
                  <strong>{item.title}</strong>
                  <br />
                  ------------------------------------------
                </li>
              ))}
            </ul>
          </div>
        </NavWrapper>
      </div>
    )
  }
}



export default withRoot(Article);
