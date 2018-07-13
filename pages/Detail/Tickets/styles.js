import {__} from '../../../style/vars'

export const styles = theme => ({

	panelExpanded: {
	  '& > div': {
	    overflow: 'inherit',
	  },
	},

	ticketsWrapper: {
	  margin: '30px 0',

	  '& .ticketHeading': {
	    [theme.breakpoints.up('md')]: {
	      display: 'flex',
	      flexWrap: 'wrap',
	    },
	    flexBasis: '100%',
	    flexShrink: 0,

	    '& > li': {
	      [theme.breakpoints.up('md')]: {
	        flex: '1 1 50%',
	      },
	    },

	    '> li:nth-child(1)': {
	      fontWeight: __.fontWeightSemiBold,
	    },

	    '> li:nth-child(2)': {

			}
	  },

	  '& ticketDescription': {
	    fontSize: __.fontSizeSmall,
	  },
	  '& .ticketDetails': {
	    margin: '30px 0',

	    '> li': {
	      display: 'flex',
	      alignItems: 'center',
	      padding: '0 0 5px',
	      [theme.breakpoints.down('md')]: {
	        fontSize: __.fontSizeSmall,
	      },

	      '> label': {
	        margin: 0,
	        fontWeight: __.fontWeightSemiBold,
	        [theme.breakpoints.down('md')]: {
	          minWidth: 100,
	          maxWidth: 100,
	        },
	        [theme.breakpoints.up('md')]: {
	          minWidth: 150,
	          maxWidth: 150,
	        },
	      },
	    },

	    '& [data-li="countdown"]': {
	      '& > div': {
	        color: __.colorAccent,
	      }
	    }
	  }
	},

	bookingForm: {
	  margin: '20px 0 0',
		[theme.breakpoints.up('md')]: {
	    display: 'flex',
	    flexWrap: 'wrap',
	  },

	  '& > li': {
	    [theme.breakpoints.down('md')]: {
	      padding: '0 0 10px',
	    },
	    [theme.breakpoints.up('md')]: {
	      flex: '1 1 auto',
	      marginLeft: 5,
	    },
	  },

	  '& > li:last-child': {
	    marginRight: 0,
	  },

	  '& [data-li="date"]': {
	    [theme.breakpoints.up('md')]: {
	      minWidth: 120,
	      maxWidth: 120,
	    },
	  },

	  '& [data-li="time"]': {
	    [theme.breakpoints.down('md')]: {
	      minWidth: 100,
	      maxWidth: 100,
	    },
	  },

	  '& [data-li="button"]': {
	    [theme.breakpoints.up('md')]: {
	      minWidth: 120,
	      maxWidth: 120,
	    },

	    '& button': {
	      margin: 0,
	    }
	  }
	}

})
