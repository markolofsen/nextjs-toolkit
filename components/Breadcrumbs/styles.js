import {__} from '../../style/vars'

export const styles = theme => ({

	breadcrumbs: {
		padding: '10px 20px',
		'& > span': {
			marginRight: 10,
			paddingRight: 10,
			borderRight: `solid 1px ${__.colorDivider}`,
			fontSize: __.fontSizeTiny,
		},
		'& > span:last-child': {
			border: 0,
			'& a': {
				color: __.colorDark,
				fontWeight: __.fontWeightSemiBold,
			}
		}
	},

})
