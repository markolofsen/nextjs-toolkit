import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { format } from 'url'

import withRoot from '../utils/withRoot';
import {get} from '../data/config';

import NavWrapper from './NavWrapper/';
// import Helmet from 'react-helmet'

import { withI18next } from '../lib/withI18next'
// import axios from 'axios';
// import Link, { prefetch } from '../components/link'
// import {Link} from '../routes'
// import ItemView from './Catalog/ItemView/';
import TimeAgo from 'react-timeago';


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paginator from '../components/Paginator/';

const cardStyles = {
  card: {
    // minWidth: 275,
    marginBottom: 10,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};


@withStyles(cardStyles)
class ReviewsCard extends Component {
  render() {
    const { classes, data } = this.props;
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              {data.username}, {data.location}
            </Typography>
            <Typography variant="headline" component="h2">
              {data.title}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              <TimeAgo date={data.created_at} />
            </Typography>
            <Typography component="p">
              <div dangerouslySetInnerHTML={{__html: data.text_html}} />
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}
ReviewsCard.propTypes = {
  classes: PropTypes.object.isRequired,
};




@withI18next(['cat'])
class Article extends Component {
  static async getInitialProps ({ req, query, pathname, isVirtualCall }) {
    const url = format({ pathname, query })

    // fetch data as usual
    //
    const pageNumber = typeof query.pagination !== 'undefined' ? query.pagination : 1;
    const data = await get(`/api/catalog/tickets/reviews/${query.slug}/?page=${pageNumber}`).then(res => res)

    const props = { data, query }
    return props
  }


  // componentDidMount() {
  //   this.props.i18n.initialLanguage = 'en'
  // }



  render () {
    const { i18n, t, data, query } = this.props

    return (
      <div>
        <NavWrapper
          _i18n={i18n}
          _title={t('Reviews')}
          _meta={[{ property: 'og:title', content: 'Reviews' }]} >
          <div data-content>

            <Typography variant="display1" gutterBottom>
              {t('Reviews')}
            </Typography>

            <Paginator
              page={data.page} route='offer_reviews'
              params={{ lang: query.lang, slug: query.slug }} />

            {data.results.map((item, index) => (
              <ReviewsCard key={index} data={item} />
            ))}
          </div>
        </NavWrapper>
      </div>
    )
  }
}



export default withRoot(Article);
