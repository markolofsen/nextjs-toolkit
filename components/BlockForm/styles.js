import {__} from '../../style/vars'

export const styles = theme => ({

	// FORM CONTAINER
	formWrapper: {
		[theme.breakpoints.down('md')]: {
			backgroundImage: 'none !important',
		},
		[theme.breakpoints.up('md')]: {
			// bgBreath
		},
		[theme.breakpoints.up('xs')]: {
			backgroundColor: __.colorPrimary,
			padding: '60px 20px';
			minHeight: 'calc(100vh - 40px)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		'& [data-el="inner"]': {
			padding: 30,
			background: '#fff',
			[theme.breakpoints.up('xs')]: {
				boxShadow: '0px 0px 0px 4px rgba(0,0,0, .1)',
				borderRadius: __.borderRadius,
				width: 500,
			},
			'& [data-el="title"]': {
					marginBottom: 40,
					textAlign: 'center',
			},
		},

	},

})
