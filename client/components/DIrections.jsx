import React from 'react'

class Directions extends React.Component {
  componentDidMount () {
    const platform = new window.H.service.Platform({
      'app_id': 'R8EbnjUs0cYuzo2VbpAy',
      'app_code': 'DwZ7Jzz1aqmZQcurKWq6sA'
    })

    const defaultLayers = platform.createDefaultLayers();

  // Instantiate (and display) a map object:
    const map = new window.H.Map(
      this.refs.directionContainer,
      defaultLayers.normal.map,
      {
        zoom: 10,
        center: { lat: -36.8484600, lng: 174.7633 }
      })
    const mapEvents = new window.H.mapevents.MapEvents(map)
    const behavior = new window.H.mapevents.Behavior(mapEvents)
    window.addEventListener('resize', () => map.getViewPort().resize())
    const routingParameters = {
      'mode': 'fastest;pedestrian',
      'waypoint0': `geo!${this.props.start.lat},${this.props.start.lng}`,
      'waypoint1': `geo!${this.props.end.lat},${this.props.end.lng}`,
      'representation': 'display'
    }
    var onResult = function(result) {
      var route,
        routeShape,
        startPoint,
        endPoint,
        strip;
      if(result.response.route) {

      route = result.response.route[0]

      routeShape = route.shape

      strip = new window.H.geo.Strip()

      routeShape.forEach(function(point) {
        var parts = point.split(',')
        strip.pushLatLngAlt(parts[0], parts[1])
      })

      startPoint = route.waypoint[0].mappedPosition
      endPoint = route.waypoint[1].mappedPosition

      var routeLine = new window.H.map.Polyline(strip, {
        style: { strokeColor: 'blue', lineWidth: 10 }
      })

      var startMarker = new window.H.map.Marker({
        lat: startPoint.latitude,
        lng: startPoint.longitude
      })

      var endMarker = new window.H.map.Marker({
        lat: endPoint.latitude,
        lng: endPoint.longitude
    })
    map.addObjects([routeLine, startMarker, endMarker])
    map.setViewBounds(routeLine.getBounds())
  }
};

var router = platform.getRoutingService()
router.calculateRoute(routingParameters, onResult,
  function(error) {
    alert(error.message);
  });
  }

  render () {
    return (
      <div ref='directionContainer' className='map'>
      </div>
    )
  }
}

export default Directions
