import React from 'react'

import {getLocations} from '../api'

export default class Map extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      locations: []
    }
    this.moveMapToAuckland = this.moveMapToAuckland.bind(this)
    this.addMarkersToMap = this.addMarkersToMap.bind(this)
  }

  componentDidMount () {
    getLocations()
    .then(res => {
      this.setState({
        locations: res.body
      })
    })
  }

  moveMapToAuckland (map){
    map.setCenter({lat: -36.848461, lng: 174.763336})
    map.setZoom(14)
  }

  addMarkersToMap (map) {
    const locations = [{ lat: -36.848461, lng: 174.763336} ,{lat:74.348047,lng:31.569907},{lat:74.307826,lng:31.573289}, {lat:74.330023,lng:31.558144}]
    return locations.map (location => {
      const marker = new H.map.Marker(location)
      map.addObject(marker)
    })
  }


  render () {
    console.log(this.state)
    const platform = new H.service.Platform({
      app_id: 'WQcyXkJedeP70Lnay6rs',
      app_code: 'EnkpwctAt48m5uvPDAaovA',
      useCIT: true,
      useHTTPS: false
  })
    const defaultLayers = platform.createDefaultLayers()
    const map = new H.Map(document.getElementById('map'),
    defaultLayers.normal.map);
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))
    const ui = H.ui.UI.createDefault(map, defaultLayers)

    return (
      <div>
        {this.addMarkersToMap(map)}
        {this.moveMapToAuckland(map)}
        </div>
    )
  }
}
