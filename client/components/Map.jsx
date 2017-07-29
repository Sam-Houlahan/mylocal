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
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    getLocations()
    .then(res => {
      this.setState({
        locations: res.body.results.items
      })
    })
  }

  moveMapToAuckland (map) {
    map.setCenter({lat: -36.848461, lng: 174.763336})
    map.setZoom(14)
  }
  handleClick (e) {
    console.log(e)
  }

  addMarkersToMap (map) {
    var animatedSvg =
   '<div><svg width="20" height="20" ' +
   'xmlns="http://www.w3.org/2000/svg" ' +
   'style="transform:translate(-10px, -10px)">' +
   '<circle cx="10" cy="10" r="5" stroke="#000" stroke-width="1" fill="#ff00ff" />'+
   '</svg><div>'

    return this.state.locations.map(location => {
      const marker = ({lat: location.position[0], lng: location.position[1]})
      var icon = new window.H.map.DomIcon(animatedSvg, {
        onAttach: element => {
          element.addEventListener('click', () => this.handleClick(location))
        }
      })
      map.addObject(new window.H.map.DomMarker(marker, {icon: icon}))
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
