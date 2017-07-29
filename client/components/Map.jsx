import React from 'react'
import {geolocated} from 'react-geolocated'
import {getLocations} from '../api'

export default class Map extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userLocation:
      {
        latitude: 0,
        longitude: 0,
      },
      locations: []
    }
    this.moveMapToAuckland = this.moveMapToAuckland.bind(this)
    this.addMarkersToMap = this.addMarkersToMap.bind(this)
    this.showUserLocation = this.showUserLocation.bind(this)
  }

  componentDidMount () {
    const platform = new H.service.Platform({
      app_id: 'WQcyXkJedeP70Lnay6rs',
      app_code: 'EnkpwctAt48m5uvPDAaovA',
      useCIT: true,
      useHTTPS: false
    })

    const defaultLayers = platform.createDefaultLayers()
    const map = new H.Map(this.refs.map, defaultLayers.normal.map);
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))
    const ui = H.ui.UI.createDefault(map, defaultLayers)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('position', position)
        this.setState({
            userLocation:
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
        })
        this.showUserLocation(map)
      }
    )
    getLocations()
      .then(res => {
        this.setState({
          locations: res.body.results.items
        })
      })
      .then(() => {
        this.addMarkersToMap(map)
        this.moveMapToAuckland(map)
      })
  }

  handleScriptCreate() {
    this.setState({ scriptLoaded: false })
}
  handleScriptError () {
    this.setState({ scriptError: true })
}
  handleScriptLoad () {
    this.setState({ scriptLoaded: true })
}

  moveMapToAuckland (map){
    map.setCenter({lat: -36.848461, lng: 174.763336})
    map.setZoom(14)
  }

  addMarkersToMap (map) {
    return this.state.locations.map(location => {
      const marker = new H.map.Marker({lat: location.position[0], lng: location.position[1]})
      map.addObject(marker)
    })
  }

  showUserLocation(map) {
    const userLocation = new H.map.Marker({
      lat: this.state.userLocation.latitude,
      lng: this.state.userLocation.longitude
    })
    console.log(this.state.userLocation)
    map.addObject(userLocation)
  }

  render () {
    return (
        <div className='Map' ref='map' />
    )
  }
}
