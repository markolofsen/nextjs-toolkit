// import Link from 'next/link'
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import withRoot from '../../utils/withRoot';
import Link, {prefetch} from '../../components/link'

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import store from '../../data/store'
import Helmet from 'react-helmet'

import LeftMenu from './LeftMenu/';
import s from './index.scss'




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
			textDecoration: 'none'
		},
		"& sup": {
			fontSize: 10,
			marginLeft: 10
		}
	}
});



@observer
class Index extends React.Component {

  handleDrawerOpen() {
    store.leftMenuToggle()
  }

	// componentDidMount() {
	// 	console.log('——————')
	// 	console.log(this.props)
	// }

	render() {
		const {classes, _i18n, _title, _meta} = this.props;

		return (
			<div className={classes.root}>
				<Helmet
					htmlAttributes={{lang: _i18n ? _i18n.languages[0] : 'en'}}
          title={`${store.mainTitle} | ${_title}`}
          meta={_meta}
        />

				<AppBar position="fixed" className={classNames(classes.appBar)}>
					<Toolbar disableGutters={!store.leftMenu} className={classes.guttersWrapper}>
						<div className={classes.headerLogo}>
							<IconButton color="inherit" aria-label="open drawer" onClick={this.handleDrawerOpen} className={classNames(classes.menuButton)}>
								<Icon>menu_icon</Icon>
							</IconButton>
							<Typography variant="title" color="inherit" noWrap>
								<Link href={`/`}>
									<span>
										<span>Name</span>
										<sup>(1.1)</sup>
									</span>
								</Link>
							</Typography>
						</div>
						<div className={classes.headerToolbar}>
							...
						</div>
					</Toolbar>
				</AppBar>
				<Drawer variant="permanent" data-menu-drawer={store.leftMenu
					? 'active'
					: 'inactive'} classes={{
					paper: classNames(classes.drawerPaper, !store.leftMenu && classes.drawerPaperClose)
				}} open={store.leftMenu}>

					{true == false && <div className={classes.toolbar}>
						<IconButton onClick={this.handleDrawerClose}>
							{theme.direction === 'rtl'
								? <Icon>chevron_right_icon</Icon>
								: <Icon>chevron_left_icon</Icon>}
						</IconButton>
						<Divider/>
					</div>}

					<LeftMenu />

				</Drawer>
				<main className={classes.content}>
					<div className={classes.contentPage}>
						{this.props.children}
					</div>
					...
				</main>

			</div>
		);
	}
}

Index.propTypes = {
	classes: PropTypes.object.isRequired,
};


// export default withRoot(withStyles(styles)(Index));
export default withStyles(styles)(Index);
