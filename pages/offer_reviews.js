import { Component } from 'react'
// import fetch from 'isomorphic-unfetch'
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
// import TimeAgo from 'react-timeago';
import TimeAgo from '../components/TimeAgo/'


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paginator from '../components/Paginator/';
import ItemView from './Catalog/ItemView/';
import {Link} from '../routes'
import { Trans } from 'react-i18next'


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



@withI18next(['cat'])
@withStyles(cardStyles)
class ReviewsCard extends Component {
  render() {
    const { classes, data, query, t } = this.props;
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
            <Link route='offer' params={{ lang: query.lang, slug: query.slug }}><a>
              <Button size="small">{t('Read more')}</Button>
            </a></Link>
          </CardActions>
        </Card>
      </div>
    );
  }
}
ReviewsCard.propTypes = {
  // classes: PropTypes.object.isRequired,
};




@withI18next(['cat'])
class Article extends Component {
  static async getInitialProps ({ req, query, pathname, isVirtualCall }) {
    const url = format({ pathname, query })

    // fetch data as usual
    //
    const pageNumber = typeof query.pagination === 'string' ? query.pagination : 1;
    const data = await get(`/api/catalog/tickets/reviews/${query.slug}/?page=${pageNumber}`).then(res => res)
    const offer = await get(`/api/catalog/tickets/short/${query.slug}/?lang=${query.lang}`).then(res => res.results)

    // const offer = `/api/catalog/tickets/short/${query.slug}/?lang=${query.lang}`


    const props = { data, offer, query, pageNumber, url }
    return props
  }



  render () {
    const { i18n, t, data, offer, query, pageNumber, url } = this.props

    let custom_title = t('cat:reviews_about', {title: offer.title.toLowerCase(), location: offer.locations[0]})

    return (
      <div>
        <NavWrapper
          _url={url}
          _query={query}
          _i18n={i18n}
          _title={custom_title}
          _meta={[{ property: 'og:title', content: custom_title }]} >
          <div data-content>

            <ItemView data={offer} />

            <Typography variant="display1" gutterBottom>
              {custom_title}
              {true == false && <Trans i18nKey={`cat:reviews_about`}>
            		{{
                  title: offer.title.toLowerCase(),
                  location: offer.locations[0]
                }}
            	</Trans>}
            </Typography>

            {data.results.map((item, index) => (
              <ReviewsCard key={index} data={item} query={query} />
            ))}

            <Paginator
              pagesTotal={Number(data.page.pages)}
              pagesCurrent={Number(data.page.current)}
              route='offer_reviews'
              params={{ lang: query.lang, slug: query.slug }}
             />

          </div>
        </NavWrapper>
      </div>
    )
  }
}



export default withRoot(Article);
