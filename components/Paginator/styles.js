import {__} from '../../style/vars'

export const styles = theme => ({

	pagination: {
		display: 'flex',
		justifyContent: 'center',
		'& > li': {
			border: `solid 1px ${__.colorDivider}`,
			backgroundColor: '#fff',
			marginRight: -1,
			'& > a': {
				display: 'inline-block',
				padding: '10px 15px',
			},
		},
		'& > li:first-child': {
			borderTopLeftRadius: 2,
			borderBottomLeftRadius: 2,
		},
		'& > li:last-child': {
			borderTopRightRadius: 2,
			borderBottomRightRadius: 2,
		},
		'& > li[data-selected="true"]': {
			fontWeight: __.fontWeightBold,
			backgroundColor: __.colorPrimary,
			borderColor: __.colorPrimary,
			'& > a': {
				color: '#fff',
			}
		}
	},

})
