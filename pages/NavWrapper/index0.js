import React from 'react';
// import {Link} from 'react-router-dom';
import Link from 'next/link'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withRoot from '../../utils/withRoot';
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

// import { connect } from 'react-redux';

import indexStyles from './index.scss'


const drawerWidth = 240;

const styles = theme => ({
	root: {
		flexGrow: 1,
		height: '100%',
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
		minHeight: '100vh'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create([
			'width', 'margin'
		], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create([
			'width', 'margin'
		], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 0
	},
	hide: {
		display: 'none'
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		}),
		height: '100%'
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		width: theme.spacing.unit * 7,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9
		},
		"@media screen and (max-width: 960px)": {
			maxWidth: 0,
			border: 0
		}
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		// padding: theme.spacing.unit * 3
		minWidth: 300,
		minHeight: '100vh',
		flexDirection: 'column',
		display: 'flex'
	},
	contentPage: {
		flex: 1,
		paddingTop: 64,
		"@media screen and (max-width: 600px)": {
			paddingTop: 56
		}
	},
	guttersWrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '0 !important',
		'& > div': {
			display: 'flex',
			alignItems: 'center',
			flexWrap: 'nowrap'
		}
	},

	// .headerWrapper: {
	//
	// },
	headerLogo: {
		'& a': {
			color: '#fff',
			textDecoration: 'none',
		},
		"& sup": {
			fontSize: 10,
			marginLeft: 10,
		}
	}
});

let _isServer = false

@observer
class MiniDrawer extends React.Component {
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
		// open: false
	};

	handleDrawerOpen = () => {
		// this.setState({open: true});
		// this.props.onToggleLeftMenu('toggle')
	};

	handleDrawerClose = () => {
		// this.setState({open: false});
		// this.props.onToggleLeftMenu(false)
	};

	render() {
		const {classes, theme} = this.props;

		// console.log('here')
		// console.log(this.props)
		let config = {
			menu_left: true,
		}

		return (
			<div className={classes.root}>
				<AppBar position="fixed" className={classNames(classes.appBar)}>
					<Toolbar disableGutters={!config.menu_left} className={classes.guttersWrapper}>
						<div className={classes.headerLogo}>
							<IconButton color="inherit" aria-label="open drawer" onClick={this.handleDrawerOpen} className={classNames(classes.menuButton)}>
								<Icon>menu_icon</Icon>
							</IconButton>
							<Typography variant="title" color="inherit" noWrap>
								<Link to={`/`}>Name
									<sup>(1.1)</sup>
								</Link>
							</Typography>
						</div>
						<div className={classes.headerToolbar}>
							...
						</div>
					</Toolbar>
				</AppBar>
				<Drawer variant="permanent" data-menu-drawer={config.menu_left
					? 'active'
					: 'inactive'} classes={{
					paper: classNames(classes.drawerPaper, !config.menu_left && classes.drawerPaperClose)
				}} open={config.menu_left}>

					{true == false && <div className={classes.toolbar}>
						<IconButton onClick={this.handleDrawerClose}>
							{theme.direction === 'rtl'
								? <Icon>chevron_right_icon</Icon>
								: <Icon>chevron_left_icon</Icon>}
						</IconButton>
						<Divider/>
					</div>}

					....
				</Drawer>
				<main className={classes.content}>
					<div className={classes.contentPage}>


					</div>
					...
				</main>

				<style jsx>{indexStyles}</style>
			</div>
		);
	}
}

MiniDrawer.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};


// export default withSSR(MiniDrawer);
// export default withStyles(styles, {withTheme: true})(MiniDrawer);

// export default connect((mapStateToProps) => (mapStateToProps), dispatch => ({
// 	onToggleLeftMenu: (payload) => {
// 		dispatch({type: 'LEFT_MENU_TOGGLE', payload})
// 	}
// }))(withStyles(styles, {withTheme: true})(MiniDrawer));
//
// export default withStyles(styles, {withTheme: true})(MiniDrawer)
export default withRoot(withStyles(styles)(MiniDrawer));
