import React from 'react'

import Map from './Map'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      locations: []
    }
  }

  render () {
    return (
      <div>
        <h1>My Local</h1>
        <Map />
      </div>
    )
  }
}

export default App
