import React from 'react'
import {getLocations, getUserLocation} from '../api'

export default class Map extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userLocation:
      {
        latitude: 0,
        longitude: 0
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
      useHTTPS: true
    })
    const defaultLayers = platform.createDefaultLayers()
    const map = new H.Map(this.refs.map, defaultLayers.normal.map);
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))
    const ui = H.ui.UI.createDefault(map, defaultLayers)
    var thisComp = this
    getUserLocation(function (position) {
      thisComp.setState({
        userLocation: position
      })
      thisComp.showUserLocation(map)
    })

    getLocations()
      .then(res => {
        this.setState({
          locations: res.body.results.items
        })
      })
      .then(() => {
        this.addInfoBubbles(map, ui)
        this.moveMapToAuckland(map)
      })
  }

  moveMapToAuckland (map) {
    map.setCenter({lat: -36.848461, lng: 174.763336})
    map.setZoom(17)
  }

  addInfoBubbles (map, ui) {
    const group = new H.map.Group()
    map.addObject(group)
    group.addEventListener('tap', function (evt) {
      const bubble =  new H.ui.InfoBubble(evt.target.getPosition(), {
        content: evt.target.getData()
      }
      )
      const previousBubbles = ui.getBubbles()
      previousBubbles.forEach(function (bubs) {
        ui.removeBubble(bubs)
      })
      ui.addBubble(bubble)
    }, false)
    this.addMarkersToMap(group, this.state.locations)
  }

  addMarkersToMap (group, location) {
    return this.state.locations.map(location => {
      const html = `<div>Title: ${location.title}</div>` + `<br/><div>Category: ${location.category.title}</div>`+
      `<br/> <div>Location: ${location.vicinity}</div>`
      const marker = new H.map.Marker({lat: location.position[0], lng: location.position[1]})
      marker.setData(html)
      group.addObject(marker)
    })
  }

  showUserLocation (map) {
    const svgMarkup = '<svg  width="20" height="20" xmlns="http://www.w3.org/2000/svg">' + '<circle cx="10" cy="10" r="5" stroke="red" stroke-width="1" fill="red" />' +'</svg>'
    const bearsIcon = new H.map.Icon(svgMarkup)
    const userLocation = new H.map.Marker({
      lat: this.state.userLocation.latitude,
      lng: this.state.userLocation.longitude
    }, {icon: bearsIcon})
    map.addObject(userLocation)
  }

  render () {
    return (
        <div className='Map' ref='map'>
        </div>
    )
  }
}
