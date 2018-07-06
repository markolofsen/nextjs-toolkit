import {__} from '../../../style/vars'

export const styles = theme => ({

	categoriesWrapper: {
		display: 'flex',
		flexWrap: 'wrap',
		borderTop: `solid 1px ${__.colorDivider}`,
		marginTop: 10,
		paddingTop: 10,
		'& a': {
			display: 'inline-block',
			padding: '4px 10px',
			margin: '0 10px 10px 0',
			borderRadius: 50,
			backgroundColor: '#fff',
			border: `solid 1px ${__.colorDivider}`,
			textDecoration: 'none',
			transition: __.transition2,
			color: __.colorPrimary,
		},
		'& a:hover': {
			borderColor: __.colorPrimary,
		},
		'& [data-selected="true"]': {
			fontWeight: __.fontWeightSemiBold,
			backgroundColor: __.colorPrimary,
			borderColor: __.colorPrimary,
			color: '#fff',
		}
	}

})
