import {__} from '../../style/vars'

export const styles = theme => ({

	ratingWrapper: {
	  display: 'inline-flex',
	  alignItems: 'center',
	  color: __.colorPrimary,

	  '& [data-li="star"] span': {
	    fontSize: 18,
	    lineHeight: '110%',
	  },
	  '& [data-li="text"]': {
	    marginLeft: 10,
	    color: __.colorTextMuted,
	  },
	},

	'[data-size="lg"]': {
	  '& [data-li="star"] span': {
	    fontSize: 30,
	  },
	  '& [data-li="text"]': {
	    fontSize: __.fontSizeBig,
	  },
	},

	'[data-size="xs"]': {
	  '& [data-li="star"] span': {
	    fontSize: __.fontSizeSmall,
	  },
	  '& [data-li="text"]': {
	    fontSize: __.fontSizeTiny,
	  }
	}

})
