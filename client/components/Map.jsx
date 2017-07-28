import React from 'react'
import HEREMap from 'react-here-maps'

export default class Map extends React.Component {
  render () {
    return (
    <HEREMap
            appId="WQcyXkJedeP70Lnay6rs"
            appCode="EnkpwctAt48m5uvPDAaovA"
            center={{lat: -36.848461, lng: 174.763336}}
            zoom={14}
        />
    )
  }
}
