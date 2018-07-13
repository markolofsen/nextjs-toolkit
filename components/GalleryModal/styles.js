import {__} from '../../style/vars'

export const styles = theme => ({

	dataGallery: {
		position: 'fixed',
		top: 0,
		right: 0,
		left: 0,
		bottom: 0,
		width: '100vw',
		height: '100vh',
		background: 'rgba(0,0,0, .8)',
		zIndex: 99999999,
		close: {
			position: 'absolute',
			zIndex: 999999999,
			top: 20,
			right: 20,
			color: '#fff',
			border: 'solid 1px rgba(0,0,0, .3)',
			background: 'rgba(0,0,0, .1)',
			borderRadius: '50%',
			width: 80,
			height: 80,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			cursor: 'pointer',
			'& > span': {
					fontSize: 40,
			},
		},
	},

})
