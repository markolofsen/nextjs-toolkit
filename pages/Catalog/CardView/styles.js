import {__} from '../../../style/vars'

export const styles = theme => ({

	wrapper: {
		// display: 'flex',
		color: '#fff',
		textShadow: '1px 1px 1px rgba(0,0,0, .4)',
		position: 'relative',
		cursor: 'pointer',
		boxShadow: __.zdepthShadow2,
		backgroundSize: 'cover',
		borderRadius: __.borderRadius,
		marginBottom: 10,

		'& [data-ul="imgOverlay"]': {
			display: 'flex',
			height: 210,
			width: '100%',
			justifyContent: 'space-between',
			flexDirection: 'column',
			'& > li:first-child': {
				padding: 20,
			},
			'& > li:last-child': {
				padding: 20,
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: 'rgba(0,0,0, .3)',
			},
		},


		'& [data-css="normalprice"]': {
			display: 'inline-block',
			paddingBottom: 3,
			borderBottom: 'solid 3px #fff',
			fontSize: __.fontSizeBig,
			fontWeight: __.fontWeightSemiBold,
		},
		'& [data-css="location"]': {
			fontSize: __.fontSizeSmall,
			'& span': {
				fontSize: __.fontSizeSmall,
				marginRight: 5,
			},
		},
		'& [data-css="title"]': {
			'& a': {
				color: '#fff',
				textDecoration: 'none',
				fontSize: __.fontSizeBig,
				fontWeight: __.fontWeightSemiBold,
			}
		},

	}

})
