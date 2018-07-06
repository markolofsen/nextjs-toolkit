import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'


import {withScriptjs, withGoogleMap, GoogleMap, OverlayView} from 'react-google-maps';
import { compose, withProps, withStateHandlers } from 'recompose';
import {googleMapKey} from '../../data/config'



const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -(height / 2),
})

const MapWithAnOverlayView = compose(
  withStateHandlers(() => ({
    count: 0,
  }), {
    onClick: ({ count }) => () => ({
      count: count + 1,
    })
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const {classes, lat, lng} = props

  const lat_ = parseFloat(lat), lng_ = parseFloat(lng)

  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: lat_, lng: lng_ }}
    >
      <OverlayView
        position={{ lat: lat_, lng: lng_ }}
        /*
         * An alternative to specifying position is specifying bounds.
         * bounds can either be an instance of google.maps.LatLngBounds
         * or an object in the following format:
         * bounds={{
         *    ne: { lat: 62.400471, lng: -150.005608 },
         *    sw: { lat: 62.281819, lng: -150.287132 }
         * }}
         */
        /*
         * 1. Specify the pane the OverlayView will be rendered to. For
         *    mouse interactivity, use `OverlayView.OVERLAY_MOUSE_TARGET`.
         *    Defaults to `OverlayView.OVERLAY_LAYER`.
         */
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        /*
         * 2. Tweak the OverlayView's pixel position. In this case, we're
         *    centering the content.
         */
        getPixelPositionOffset={getPixelPositionOffset}
        /*
         * 3. Create OverlayView content using standard React components.
         */
      >
        <div className={classes.icon} onClick={props.onClick}>
          {props.count}
        </div>
      </OverlayView>
    </GoogleMap>
  )

}
);



@withStyles(styles)
class GoogleMapBlock extends Component {

	render() {
    const {classes, lat, lng} = this.props
		return (
			<div>
				<MapWithAnOverlayView
          {...this.props}
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
