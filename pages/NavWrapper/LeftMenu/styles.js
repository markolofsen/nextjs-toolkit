import {__} from '../../../style/vars'

export const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		background: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4
	},

	leftMenu: {
	  overflowY: 'auto',
	  maxHeight: `calc(100vh - 100px)`,
	  '& a': {
	    textDecoration: 'none',
	  },
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

})
