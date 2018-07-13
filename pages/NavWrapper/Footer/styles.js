import {__} from '../../../style/vars'

export const styles = theme => ({

	wrapper: {
	    background: __.colorBg,

	    [theme.breakpoints.up('md')]: {
	        padding: '30px 0',
	        maxHeight: 250,
	    },
	    '& [data-content]': {
	        '& a': {
	            textDecoration: 'none',
	            color: 'rgba(0,0,0, .7)',
	            transition: __.transition2,
	        },
	        '& a:hover': {
	            color: __.colorPrimary,
	        },

	        '& > ul': {
	            [theme.breakpoints.up('md')]: {
	                display: 'flex',
	            },
	            '& li': {
	                flex: '1 1 auto',
	            },
	            '& [data-li="logotype"]': {
	                [theme.breakpoints.down('md')]: {
	                    marginBottom: 20,
	                    paddingBottom: 10,
	                    borderBottom: 'solid 1px rgba(0,0,0, .2)',
	                },
	                [theme.breakpoints.up('md')]: {
	                    minWidth: '30%',
	                    maxWidth: '30%',
	                    marginRight: 30,
	                },
	                '& h3': {
	                    margin: 0,
	                    padding: 0,
	                    textDecoration: 'none',
	                    color: __.colorDark,
	                    [theme.breakpoints.down('md')]: {
	                        fontSize: 20,
	                        fontWeight: __.fontWeightBold,
	                    },
	                    [theme.breakpoints.up('md')]: {
	                        fontSize: 30,
	                        fontWeight: __.fontWeightThin,
	                    }
	                },
	                '& p': {
	                    color: 'rgba(0,0,0, .5)',
	                }
	            },
	            '& [data-li="menu"]': {

	                display: 'flex',
	                justifyContent: 'space-between',
	                [theme.breakpoints.down('md')]: {
	                    flexWrap: 'wrap',
	                },

	                '& > ul': {
	                    marginBottom: 20,
	                    '& > li': {
	                        padding: '5px 0',
	                        flex: '1 1 25%',
	                        minWidth: 150,
	                    },
	                },

	                '& [data-el="gototop"]': {
	                    flex: '1 1 25%',
	                    minWidth: 150,
	                    textAlign: 'center',

	                    display: 'inline-block',
	                    color: __.colorPrimary,
	                    border: `solid 1px ${__.colorPrimary}`,
	                    borderRadius: __.borderRadius,
	                    padding: '4px 10px',
	                    transition: __.transition2,
	                    cursor: 'pointer',
	                },
	                '& [data-el="gototop"]:hover': {
	                    background: __.colorPrimary,
	                    color: '#fff',
	                },
	            },
	        },

	    },

	    '& [data-el="copyright"]': {
	        textAlign: 'center',
	        color: 'rgba(0,0,0, .5)',
	        fontSize: __.fontSizeTiny,
	        margin: '20px 0 0',
	    },

	}

})
