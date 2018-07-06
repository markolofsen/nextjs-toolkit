import {__} from '../../../style/vars'

export const styles = theme => ({

	itemBox: {
		display: 'flex',

		[theme.breakpoints.down('md')]: {
			"margin": "0 0 20px",
			"flexWrap": "wrap"
		},
		[theme.breakpoints.up('md')]: {
			"padding": "30px",
			"margin": "15px 0",
		},
		'& > li': {
			"flex": "1 1 auto",
		},

		'& > [data-li="preview"]': {
			[theme.breakpoints.down('md')]: {
				"marginBottom": "20px"
			},
			[theme.breakpoints.up('md')]: {
				"minWidth": 320,
				"maxWidth": 320,
				"backgroundColor": __.colorBg,
			},

			img: {
				width: '100%',
				borderRadius: __.borderRadius,
				[theme.breakpoints.down('md')]: {
					"borderBottomLeftRadius": 0,
					"borderBottomRightRadius": 0
				}
			}
		},
		'& > [data-li="details"]': {
			[theme.breakpoints.down('md')]: {
				padding: '0 20px'
			},
			[theme.breakpoints.up('md')]: {
				padding: '0 0 0 20px',
			},

			'& [data-ul="header"]': {
				[theme.breakpoints.down('md')]: {
					marginBottom: 15
				},
				[theme.breakpoints.up('md')]: {
					display: 'flex',
					justifyContent: 'space-between',
					marginBbottom: 30
				},
				'& [data-el="location"]': {
					padding: '10px 0 0',
					display: 'flex',
					alignItems: 'center'
				},
				'& [data-li="price"]': {
					fontSize: __.fontSizeBig,
					[theme.breakpoints.down('md')]: {
						marginTop: 15
					},
					[theme.breakpoints.up('md')]: {
						marginLeft: 20
					},
					'& > ul': {
						display: 'flex',
						alignItems: 'center',
						flexWrap: 'wrap',
						'& > li': {
							textAlign: 'right',
							marginRight: 6,
							padding: '2px 7px'
						},
						'& > li:last-child': {
							marginRight: 0
						},
						'& [data-li="countdown"]': {
							color: __.colorAccent,
							fontSize: __.fontSizeSmall,
							whiteSpace: 'nowrap'
						},

						'& [data-li="discount"]': {
							color: __.colorAccent,
							border: `solid 1px ${__.colorAccent}`,
							borderRadius: __.borderRadius,
							whiteSpace: 'nowrap',
						},

						'& [data-li="normalprice"]': {
							color: __.colorPrimary,
							border: `solid 1px ${__.colorPrimary}`,
							borderRadius: __.borderRadius,
							whiteSpace: 'nowrap'
						},
					},
				},
			},

			'& [data-el="description"]': {
				fontStyle: 'italic',
				color: __.colorTextMuted,
			},

			'& [data-el="reviewsRating"]': {
				display: 'flex',
				alignItems: 'center',
				margin: '15px 0',
				'& > li:nth-child(1)': {
					marginRight: '10px'
				}
			}
		}

	}

})
