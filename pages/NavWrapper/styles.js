import {__} from '../../style/vars'

const drawerWidth = 240;

export const styles = theme => ({

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
		height: '100%',
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
		[theme.breakpoints.down('sm')]: {
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

	headerWrapper: {},
	headerLogo: {
		cursor: 'pointer',
		'& a': {
			color: '#fff',
			textDecoration: 'none'
		},
		"& sup": {
			fontSize: 10,
			marginLeft: 10
		}
	},

	'[data-menu-drawer="active"]': {
		display: 'none',
		//   leftMenu: {
		//     // @media screen and (--md-min) {
		//     //   width: 240px;
		//     // }
		//     paddingTop: 25,
		//   },
	},
	//
	// '& [data-menu-drawer="inactive"]': {
	//   leftMenu: {
	//     // @media screen and (--md-min) {
	//     //   padding-top: 65px;
	//     // }
	//   },
	//
	//   '& [data-menu-label]': {
	//     display: 'none',
	//   },
	//
	//   '& [data-menulist-submenu]': {
	//     display: 'none',
	//   },
	// },
	importantWrapper: {

		/*
	   * Hack, because material-ui applying own styles
	   */
		'& [data-icon]': {
			paddingBottom: 0
		},

		/*
	   * Other...
	   */
		'& [data-content]': {
			padding: 20
		},
		'& [data-content-inner]': {
			[theme.breakpoints.down('md')]: {
				padding: 20
			},
			[theme.breakpoints.up('md')]: {
				width: '90%',
				maxWidth: 1500,
				margin: '0 auto'
			}
		},

		'& [data-label]': {
			color: __.colorTextMuted,
			fontSize: __.fontSizeTiny,
			fontWeight: __.fontWeightThin,
			display: 'block'
		},

		/*
		 * LINKS
		 */
		'& [data-link]': {
			color: __.colorPrimary,
			transition: __.transition2,
			cursor: 'pointer',
			textDecoration: 'none'
		},
		'& [data-link]:hover': {
			opacity: .7
		},
		'& [data-link="underlined"]': {
			textDecoration: 'none',
			borderBottom: `solid 1px ${__.colorPrimary}`
		},
		'& [data-link="underlined"]:hover': {
			textDecoration: 'none'
		},
		'& [data-link-button]': {
			textDecoration: 'none'
		},
		'& [data-link-button="white"]': {
			color: '#fff !important',
			textDecoration: 'none !important'
		},

		'& [data-short]': {
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis'
		},
		'& [data-nowrap]': {
			whiteSpace: 'nowrap'
		},

		'& [data-box]': {
			background: '#fff',
			boxShadow: __.shadow2p,
			borderRadius: __.borderRadius
		},
		'& [data-box="new"]': {
			background: '#fff',
			boxShadow: `0 0 0 4px rgba(0, 0, 0, 0.12), ${__.zdepthShadow2}`,
			borderRadius: 6
		},

		'& h1, & h2, & h3, & h4, & h5, & h6': {
			cursor: 'default'
		},
		'& [data-tag="h1"], & [data-tag="h3"]': {
			fontWeight: __.fontWeightThin,
			margin: 0,
			padding: 0,
			[theme.breakpoints.down('md')]: {
				fontSize: 30
			},
			[theme.breakpoints.up('md')]: {
				fontSize: 50
			}
		},
		'& [data-tag="h4"]': {
			fontWeight: __.fontWeightThin,
			margin: 0,
			padding: 0,
			[theme.breakpoints.down('md')]: {
				fontSize: 25
			},
			[theme.breakpoints.up('md')]: {
				fontSize: 40
			}
		},

		/*
		 * TEXT COLORS...
		 */
		'& [data-color="primary"]': {
			color: __.colorPrimary
		},
		'& [data-color="danger"]': {
			color: __.colorAccent
		},
		'& [data-color="success"]': {
			color: __.colorSuccess
		},
		'& [data-color="mute"]': {
			color: __.colorTextMuted
		},

		/*
	   * ZERO FOR ORDERS
	   */
		'& [data-zero]': {
			opacity: .5,
			textDecoration: 'none',
			transition: __.transition2
		},
		'& [data-zero]:hover': {
			opacity: 1
		},

		/*
		 * Code formatter
		 */
		'& code': {
			background: __.colorBg,
			padding: 20
		}
	}

})
