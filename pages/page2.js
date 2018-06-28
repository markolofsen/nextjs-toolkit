// import Link from 'next/link'
import Link, { prefetch } from '../components/link'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import withRoot from '../utils/withRoot';
import store from '../data/store'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import Router from 'next/router'

import NavWrapper from './NavWrapper/';
import Helmet from 'react-helmet'


//
// Router.beforePopState(({ url, asPath, options }) => {
//   // I only want to allow these two routes!
//   if (asPath != "/" && store.isAuth != true) {
//     // Have SSR render bad routes as a 404.
//     // window.location.href = as
//     return false
//   }
//
//   return true
// });


const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

let _isServer = false

@observer
class Index extends React.Component {
  static async getInitialProps ({ req }) {
    if (req) {
      Helmet.renderStatic()
    }
    return { title: 'About' }
  }

  // static async getInitialProps({ req }) {
  //   _isServer = !!req
  //   console.log(`Index page: getInitialProps isServer[${_isServer}]`)
  //   if (_isServer) {
  //     await store.init(true)
  //   }
  //   return { store }
  // }
  //
  // constructor(props) {
  //   super(props)
  //   console.log("Index page: constructor isServer = ", _isServer)
  //   if (!_isServer && !store.clientInited) {
  //     console.log("Index page: constructor at Client, init store")
  //     let storeData = props.store
  //     store.init(false, storeData)
  //     store.delayAdd(3)
  //     store.startClock()
  //   }
  // }

  render() {
    const { title } = this.props

    return (
      <div>
        <Helmet
          title={`${title} | Hello next.js!`}
          meta={[{ property: 'og:title', content: title }]}
        />

        <NavWrapper>
          <div>
            Welcome to Page2
            <br />
            <Link href={{ pathname: '/', query: { name: 'haha' } }}>
              <Button variant="raised" color="primary">
                Back
              </Button>
            </Link>
          </div>
        </NavWrapper>
      </div>
    )
  }
}

Index.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
