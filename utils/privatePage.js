import React from 'react';

import store from '../data/store'

import Router from 'next/router'
/*
Above Router object comes with the following API:

    route - String of the current route
    pathname - String of the current path excluding the query string
    query - Object with the parsed query string. Defaults to {}
    asPath - String of the actual path (including the query) shows in the browser
    push(url, as=url) - performs a pushState call with the given url
    replace(url, as=url) - performs a replaceState call with the given url
    beforePopState(cb=function) - intercept popstate before router processes the event.
*/

function privatePage(PageComponent) {
  class privatePage extends React.Component {
    constructor(props, context) {
      super(props, context);
    }
    render() {
      return (
        <PageComponent {...this.props} />
      );
    }
  }

  /*
  getInitialProps receives a context object with the following properties:
    pathname - path section of URL
    query - query string section of URL parsed as an object
    asPath - String of the actual path (including the query) shows in the browser
    req - HTTP request object (server only)
    res - HTTP response object (server only)
    jsonPageRes - Fetch Response object (client only)
    err - Error object if any error is encountered during the rendering
  */
  privatePage.getInitialProps = (context) => {

    if (!store.isAuth) {
      console.warn("Can't access private page, need auth first, redirect to /")
      Router.replace('/')
      return {};
    }

    // if (context && context.req) {
    //   console.log("privatePage on Server, pathname = ", context.pathname)
    //   console.log("privatePage on Server, query = ", context.query)
    //   if (context.pathname != '/') {
    //     console.warn("privatePage replace to /")
    //     Router.replace('/')
    //     return {};
    //   }
    // }

    if (PageComponent.getInitialProps) {
      return PageComponent.getInitialProps(context);
    }

    return {};
  };

  return privatePage;
}

export default privatePage;