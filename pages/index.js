import React from 'react';
import PropTypes from 'prop-types';
// import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Button from '@material-ui/core/Button';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../utils/withRoot';

// import Link from 'next/link'

import store from '../data/store'

import Switch from '@material-ui/core/Switch';


import { withI18next } from '../lib/withI18next'
import PureComponent from '../components/PureComponent'
import ExtendedComponent from '../components/ExtendedComponent'
import ComponentWithTrans from '../components/ComponentWithTrans'



import Link, { prefetch } from '../components/link'

import NavWrapper from './NavWrapper/';

// import Router from 'next/router'

// Router.beforePopState(({ url, asPath, options }) => {
//   // I only want to allow these two routes!
//   if (asPath != "/" && store.isAuth != true) {
//     // Have SSR render bad routes as a 404.
//     // window.location.href = as
//     return false
//   }

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
@withI18next(['home', 'common'])
class Index extends React.Component {

  static async getInitialProps({ req }) {
    _isServer = !!req
    console.log(`Index page: getInitialProps isServer[${_isServer}]`)
    if (_isServer) {
      await store.init(true)
    }
    return { store }
  }

  constructor(props) {
    super(props)
    console.log("Index page: constructor isServer = ", _isServer)
    if (!_isServer && !store.clientInited) {
      console.log("Index page: constructor at Client, init store")
      let storeData = props.store
      store.init(false, storeData)
      store.delayAdd(3)
      store.startClock()
    }
  }

  state = {
    open: false,
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    console.log("index render() store.isAuth = ", store.isAuth)
    const { classes, t } = this.props;
    const { open } = this.state;

    return (
      <div>
        <NavWrapper>
          <div className={classes.root}>
            <Dialog open={open} onClose={this.handleClose}>
              <DialogTitle>Super Secret Password</DialogTitle>
              <DialogContent>
                <DialogContentText>1-2-3-4-5</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button color="primary" onClick={this.handleClose}>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
            <Typography variant="display1" gutterBottom>
              Material-UI
            </Typography>
            <Typography variant="subheading" gutterBottom>
              example project
            </Typography>
            <Typography variant="subheading" gutterBottom>
              isServer = {"" + store.isServer} name = {"" + store.name} age = {"" + store.age}
            </Typography>
            <Button variant="raised" color="secondary" onClick={this.handleClick}>
              Open Dialog
            </Button>
            <br />
            <h1>{t('welcome')}</h1>
            <p>{t('common:integrates_react-i18next')}</p>
            <PureComponent t={t} />
            <ExtendedComponent />
            <ComponentWithTrans />
            <Link href='/page2'>
              <a>{t('link.gotoPage2')}</a>
            </Link>

            <br />
            Now = {store.now}
            <br />
            <Link href={{ pathname: '/page2', query: { name: 'Zeit' } }}>
              <Button variant="raised" color={store.age > 17 ? "secondary" : "primary"}>
                页面2 age={"" + store.age}
              </Button>
            </Link>
            <br />
            Auth =<Switch
              checked={store.isAuth}
              onClick={(event, checked) => {
                store.isAuth = !store.isAuth
              }}
              value="checkedB"
              color="primary"
            />
            <br />
            <Link href={{ pathname: '/page3', query: { name: 'Zeit' } }}>
              <Button variant="raised" color="primary">
                仅Auth状态才能跳转的页面Page3
              </Button>
            </Link>
            <br />
            <h1>Next.js - with data prefetch example</h1>
            <ul>
              <li>
                <Link href='/article?id=1' prefetch withData>
                  <a>Article 1</a>
                </Link>
              </li>
              <li>
                <Link href='/article?id=2' prefetch>
                  <a>Article 2</a>
                </Link>
              </li>
              <li>
                <Link href='/article?id=3' >
                  <a onMouseOver={e => prefetch('/article?id=3')} >Article 3</a>
                </Link>
              </li>
            </ul>
          </div>
        </NavWrapper>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
