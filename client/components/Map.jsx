import React from 'react'
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
    this.addInfoBubbles = this.addInfoBubbles.bind(this)
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
        this.addInfoBubbles(map,ui)
        this.moveMapToAuckland(map)
      })
  }

  moveMapToAuckland (map) {
    map.setCenter({lat: -36.848461, lng: 174.763336})
    map.setZoom(14)
  }

  addInfoBubbles (map, ui) {
    const group = new H.map.Group()
    map.addObject(group)
    group.addEventListener('tap', function (evt) {
      const bubble =  new H.ui.InfoBubble(evt.target.getPosition(), {
        content: evt.target.getData()
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
        <div className='Map' ref='map'>
        </div>
    )
  }
}
