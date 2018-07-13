import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'


import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

import { compose, withProps, withStateHandlers } from 'recompose';
import {googleMapKey} from '../../data/config'

import {get} from '../../data/config';
import L, {Link} from '../../routes'

const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -(height / 2),
})

const MapWithAnOverlayView = compose(
withStateHandlers(() => ({count: 0}), {
	onClick: ({count}) => () => ({
		count: count + 1
	})
}),
  withScriptjs,
  withGoogleMap
)(props => {
  const {classes, data, defaultPoint, lang} = props


  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: defaultPoint.lat, lng: defaultPoint.lng }}
    >
      <MarkerClusterer
        // onClick={props.onMarkerClustererClick}
        averageCenter
        enableRetinaIcons
        gridSize={60} >

        {data.map((item, index) => {
          return (
            <Marker
                key={index}
                position={{ lat: item.point.lat, lng: item.point.lng }}
                onClick={() => props.onToggleOpen(index)}
                icon={{
                  path: 0, // circle
          				fillOpacity: 1,
          				fillColor: '#60a3fe',
          				strokeOpacity: 1.0,
          				strokeColor: 'white',
          				strokeWeight: 3.0,
          				scale: 9 //pixels
          				}}
                >
              {item.open && <InfoWindow onCloseClick={() => {}}>
                <Link route='offer' params={{ lang: lang, slug: item.slug }}>
                  <a>
                    {item.title}
                  </a>
                </Link>
              </InfoWindow>}
            </Marker>
          )

          // return (
          //   <OverlayView
          //     key={index}
          //     position={{ lat: item.point.lat, lng: item.point.lng }}
          //     /*
          //      * An alternative to specifying position is specifying bounds.
          //      * bounds can either be an instance of google.maps.LatLngBounds
          //      * or an object in the following format:
          //      * bounds={{
          //      *    ne: { lat: 62.400471, lng: -150.005608 },
          //      *    sw: { lat: 62.281819, lng: -150.287132 }
          //      * }}
          //      */
          //     /*
          //      * 1. Specify the pane the OverlayView will be rendered to. For
          //      *    mouse interactivity, use `OverlayView.OVERLAY_MOUSE_TARGET`.
          //      *    Defaults to `OverlayView.OVERLAY_LAYER`.
          //      */
          //     mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          //     /*
          //      * 2. Tweak the OverlayView's pixel position. In this case, we're
          //      *    centering the content.
          //      */
          //     getPixelPositionOffset={getPixelPositionOffset}
          //     /*
          //      * 3. Create OverlayView content using standard React components.
          //      */
          //   >
          //     <div className={classes.icon} onClick={props.onClick}>
          //       Ok
          //     </div>
          //   </OverlayView>
          // )
        })}
      </MarkerClusterer>
    </GoogleMap>
  )

}
);



@withStyles(styles)
class GoogleMapBlock extends Component {

  constructor(props) {
		super(props);
		this.state = {
      data: false,
      meta: false,
    };
	}

	componentDidMount() {

    const {lang} = this.props

    if(typeof window !== 'undefined') {
      get(`/api/catalog/tickets/map/?lang=${lang}`).then(res => {
        this.setState({
          data: res.results,
          meta: res.meta
        })
        // console.log(res.results)
      })
    }
  }

  onToggleOpen = (index) => {
    const {data} = this.state
    let newState = data
    newState[index].open = !data[index].open
    // alert(index)
    // console.log(newState)
    this.setState({data: newState})
  }

	render() {
    const {classes, lat, lng, lang} = this.props
    const {data, meta} = this.state

    if(!data || !meta) {
      return <div />
    }

		return (
			<div>
				<MapWithAnOverlayView
          {...this.props}
          lang={lang}
          data={data}
          onToggleOpen={this.onToggleOpen}
          defaultPoint={meta.defaultPoint}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleMapKey}&v=3.exp&libraries=geometry`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}/>
			</div>
		)
	}
}

GoogleMapBlock.propTypes = {
	// 	// classes: PropTypes.object.isRequired,
};

export default GoogleMapBlock
