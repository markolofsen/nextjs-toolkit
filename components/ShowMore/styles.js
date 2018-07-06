import {__} from '../../style/vars'

export const styles = theme => ({

	contentFormat: {

		'& ul': {
			listStyle: 'none none',
			padding: 0,
			margin: '15px 0',
		},
		'& li': {
			padding: '0 0 15px',
			display: 'flex',
		},
		'& li:last-child': {
			paddingBottom: 0
		},
		'& li:before': {
			content: "★ ",
			fontSize: 12,
			minWidth: 30,
			maxWidth: 30,
			color: __.colorPrimary,
		},

		'& [data-el="more"]': {
			marginTop: 15,
			'& > span': {
				display: 'inline-block',
				padding: '5px 20px',
				border: `solid 1px ${__.colorPrimary}`,
				borderRadius: 50,
				cursor: 'pointer',
				transition: __.transition2,
				background: '#fff',
				color: __.colorPrimary,

			},
			'& > span:hover': {
				background: __.colorPrimary,
				color: '#fff',
			}
		}
	}
})
