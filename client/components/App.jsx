import React from 'react'
import {getLocations} from '../api'
import Map from './Map'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      locations: []
    }
  }

  getSights () {
    getLocations()
    .then(res => {
      this.setState({
        locations: res.body
      })
    })
  }

  render () {
    return (
      <div>
        <h1>MyLocal</h1>
        <Map />
      </div>
    )
  }
}

export default App
