import {__} from '../../style/vars'

export const styles = theme => ({


	gallerySSR: {
	  display: 'flex',
	},

	offerWrapper: {
	  background: '#fff',
	  padding: '0 0 30px',
		// '& [data-content]': {
		// 	[theme.breakpoints.down('md')]: {
		//     padding: '50px 20px',
		//   },
		//   [theme.breakpoints.up('md')]: {
		//     padding: '30px 50px',
		//   },
		// },
	},

	contentWrapper: {
	  [theme.breakpoints.up('md')]: {
	    display: 'flex',
	    justifyContent: 'space-between',
	    marginBottom: 30,
	    padding: 0,
	  },

	  '& > li': {
	    flex: '1 1 auto',
	  },

	  '& > [data-li="left"]': {
	    [theme.breakpoints.up('md')]: {
	      maxWidth: 'calc(100% - 335px)',
	    },
	  },

	  '& > [data-li="right"]': {
	    [theme.breakpoints.up('md')]: {
	      minWidth: 335,
	      maxWidth: 335,
	      paddingLeft: 30,
	    }
	  }
	},

	/*
	 * PANORAMA
	 */
	videoPanorama: {
	  height: 400,
	  backgroundColor: '#000',
	},
	imagePanorama: {
	  backgroundColor: '#000',
	  backgroundPosition: 'center center',
	  backgroundRepeat: 'no-repeat',
	  backgroundSize: 'cover',
	  backgroundClip: 'content-box',
	  height: 400,
	  cursor: 'pointer',
	  display: 'flex',
	  alignItems: 'flex-end',
	  justifyContent: 'flex-start',
	},

	galleryButtons: {

	  [theme.breakpoints.down('md')]: {
	    padding: '0 0 15px 15px',
	  },
	  [theme.breakpoints.up('md')]: {
	    padding: '0 0 30px 30px',
	  },
	  '& button': {
	    marginRight: 10,
	  },
		'& [data-gallery-buttons]': {
			transition: __.transition5,
		},
		'& [data-gallery-buttons="false"]': {
			margin: '-70px 0 0',
		},
		'& [data-gallery-buttons="true"]': {
			margin: '20px 0 0',
		},
	},


	/*
	 * HEADER
	 */
	contentHeader: {
		'& [data-css="categories"]': {
			display: 'flex',
			marginBottom: 30,
			'& > li': {
				marginRight: 10,
				paddingRight: 10,
				borderRight: `solid 1px ${__.colorDivider}`,
			},
			'& > li:last-child': {
				border: 0,
			},
		},
	  '& [data-li="location"]': {
	    display: 'flex',
	    alignContent: 'center',
	    marginTop: 15,
	    '& > span': {
	      marginRight: 10,
	    },
	  },
	},
	/*
	 * DESCRIPTION
	 */
	offerDescription: {
	  margin: '30px 0',
	},
	/*
	 * REVIEWS
	 */
	'reviewsWrapper': {

	  [theme.breakpoints.down('md')]: {
	    marginTop: 30,
	  },

	  '& [data-css="reviewsTop"]': {
	    display: 'flex',
			alignItems: 'center',
	    justifyContent: 'space-between',
	    marginBottom: 30,
	  },

	  '& [data-css="reviewsList"]': {
	    [theme.breakpoints.up('md')]: {
	      maxHeight: '100vh',
	      overflowY: 'auto',
	      position: 'sticky',
	    },

	    '& [data-block="review"]': {
	      margin: '0 0 20px',
	      padding: '0 0 20px',
	      borderBottom: `solid 1px ${__.colorDivider}`,

	      '& [data-list="header"]': {
	        display: 'flex',
	        alignItems: 'center',
	        marginBottom: 15,

	        '& > li': {
	          flex: '1 1 auto',
	        },

	        '& [data-li="avatar"]': {
	          maxWidth: 80,
	          minWidth: 80,

	          '> img': {
	            borderRadius: '50%',
	            // box-shadow: var(--shadow-2p);
	            border: 'solid 3px #fff',
	          },
	        },

	        '& [data-li="userdata"] > ul': {
	          display: 'flex',
	          justifyContent: 'space-between',

	          '& [data-el="location"]': {
	            // font-size: var(--font-size-tiny);
	            // color: var(--color-text-secondary);
	            margin: '0 0 5px',
	          },

	          '& [data-li="date"]': {
	            fontSize: __.fontSizeTiny,
	            color: __.colorTextMuted,
	            whiteSpace: 'nowrap',
	          },
	        },
	      },

	      '& [data-list="content"]': {
	        '& [data-li="title"]': {
	          // font-size: var(--font-size-normal);
	          // font-weight: var(--font-weight-semi-bold);
	        },

	        '& [data-li="text"]': {
	          // fontSize: var(--font-size-small);
	        },
	      },
	    },
	  },
	},

})
