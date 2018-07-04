import {__} from '../../../style/vars'

export const styles = theme => ({

	paper: {
		...__.listUnstyled,
		height: 'auto',
		maxHeight: 'auto',
		overflow: 'auto',
		width: 305,
		'& ul': __.listUnstyled,
	},


	typography: {
		margin: 4,
		padding: '10px 15px'
	},

	input: {
		height: 52,
		border: `solid 1px ${__.colorDivider}`,
		borderRadius: __.borderRadius,
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		padding: '0 10px',

		'& > li': {
			padding: 5,
			borderRadius: __.borderRadius,
			background: __.colorPrimary,
			marginRight: 10,
			cursor: 'pointer',
			transition: __.transition2,
			whiteSpace: 'nowrap'
		},

		'& > li:hover': {
			opacity: 0.7
		}
	},

	popover: {
		padding: '7px 15px',

		'& [data-ul="block"]': {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			padding: '10px 0',

			'& label': {
				margin: 0,
				display: 'flex',
				flexWrap: 'wrap',

				'& [data-el="label"]': {
					marginRight: 5,
					fontWeight: __.fontWeightSemiBold,
					whiteSpace: 'nowrap'
				},

				'& [data-el="price"]': {
					'& [data-margin]': {
						margin: '0 5px'
					}
				}
			},

			'& small': {
				display: 'block'
			}
		},

		'& [data-ul="buttons"]': {
			display: 'flex',
			alignItems: 'center',

			'& > li:nth-child(1), & > li:nth-child(3)': {
				cursor: 'pointer',
				border: `solid 1px ${__.colorDivider}`,
				borderRadius: '50%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				overflow: 'hidden',
				minWidth: 40,
				maxWidth: 40,
				minHeight: 40,
				maxHeight: 40
			},

			'& > li:nth-child(2)': {
				padding: '0 10px',
				minWidth: 40,
				maxWidth: 40,
				textAlign: 'center'
			}
		}
	}
})
