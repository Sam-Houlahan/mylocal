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
        locations: res.body.results.items
      })
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

  render () {
    const platform = new H.service.Platform({
      app_id: 'WQcyXkJedeP70Lnay6rs',
      app_code: 'EnkpwctAt48m5uvPDAaovA',
      useCIT: true,
      useHTTPS: false
  })
    const defaultLayers = platform.createDefaultLayers()
    const map = new H.Map(document.getElementById('app'),
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
