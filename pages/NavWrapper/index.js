// import Link from 'next/link'
// import withRoot from '../../utils/withRoot';
// import Link, {prefetch} from '../../components/link'
import L, {Link} from '../../routes'

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { observable } from 'mobx'
import { observer } from 'mobx-react'
import store from '../../data/store'
import Helmet from 'react-helmet'
import {isBrowser, isMobile} from 'react-device-detect';

import LeftMenu from './LeftMenu/';
import Footer from './Footer/';

import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'


import { I18n } from '../../i18n'
import { translate } from 'react-i18next'

/*
 * PRELOADER
 */
import NProgress from 'nprogress'
import Router from 'next/router'
Router.onRouteChangeStart = (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()







@observer
@translate('common')
class Index extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
    }
  }


  handleDrawerOpen = () => {
    window.scrollTo(0, 0)
    store.leftMenuToggle()
  }


  getCanonical = (url) => {
    let rePath = url.asPath
    if(typeof url.query.pagination !== 'undefined') {
      rePath = rePath.substr(0, rePath.lastIndexOf("/"));
    }
    return rePath
  }

	setLanguage(language) {
		I18n.init({
			lng: language,
		});

		let saveRoute = L.Router.router.route.split('/')[1]
    // alert(saveRoute)

		let saveParams = L.Router.router.query
				saveParams.lang = language

    // Hack for index/catalog
    if(saveRoute == 'catalog' && typeof saveParams.folder === 'undefined') {
      saveRoute = 'index'
    }

		L.Router.pushRoute(saveRoute, saveParams)
		this.handleClose()

	}
  componentWillMount() {
    store.init()
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    store.languageUpdate()
  }

  componentDidMount() {

    // First reload for apply css styles
  	// if (window.sessionStorage) {
  	// 	if (!sessionStorage.getItem('firstLoad')) {
  	// 		sessionStorage['firstLoad'] = true
  	// 		window.location.reload()
  	// 	}
  	// }
  }


	handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

	render() {
		const {classes, t, _i18n, _title, _meta, _url, _query} = this.props;
		const { anchorEl } = this.state;

		return (
			<div className={classNames(classes.root, classes.importantWrapper)}>
				<Helmet
					htmlAttributes={{lang: _query.lang}}
          title={`${_title} | ${t('Things to do in Tenerife')}`}
          meta={_meta}
          link={[
            { rel: 'canonical', href: this.getCanonical(_url)},
          ]}
        />
			<AppBar position="fixed" className={classes.appBar}>
					<Toolbar disableGutters={!store.leftMenu} className={classes.guttersWrapper}>
						<div className={classes.headerWrapper}>
							<IconButton color="inherit" aria-label="open drawer" onClick={this.handleDrawerOpen} className={classes.menuButton}>
								<Icon>menu_icon</Icon>
							</IconButton>
							<Typography variant="title" color="inherit" noWrap className={classes.headerLogo}>
								<Link route='index' params={{ lang: store.language }}>
									<a>
										<span>{store.sitename}</span>
										<sup>(1.1)</sup>
									</a>
								</Link>
							</Typography>
						</div>
						<div className={classes.headerToolbar}>
							<Button
			          aria-owns={anchorEl ? 'language-menu' : null}
			          aria-haspopup="true"
			          onClick={this.handleClick}
								color="inherit" >
								<Icon style={{marginRight: 5}}>language</Icon>
								{store.language}
			        </Button>
			        <Menu
                id="language-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}>
                  <MenuItem onClick={() => this.setLanguage('en')}>English</MenuItem>
                  <MenuItem onClick={() => this.setLanguage('es')}>Spanish</MenuItem>
                  <MenuItem onClick={() => this.setLanguage('ru')}>Russian</MenuItem>
                  <MenuItem onClick={() => this.setLanguage('de')}>German</MenuItem>
                  <MenuItem onClick={() => this.setLanguage('fr')}>French</MenuItem>
			        </Menu>

						</div>
					</Toolbar>
				</AppBar>
				<Drawer variant="permanent" data-menu-drawer={store.leftMenu
					? 'active'
					: 'inactive'} classes={{
					paper: classNames(classes.drawerPaper, !store.leftMenu && classes.drawerPaperClose)
				}} open={store.leftMenu}>

					<div className={classes.toolbar}>
						<IconButton onClick={this.handleDrawerClose}>
							<Icon>chevron_right_icon</Icon>
						</IconButton>
						<Divider/>
					</div>

					<LeftMenu />

				</Drawer>
				<main className={classes.content}>
					<div className={classes.contentPage}>
							{this.props.children}
					</div>
					<Footer store={store} />
				</main>

			</div>
		);
	}
}

Index.propTypes = {
	// classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Index)
