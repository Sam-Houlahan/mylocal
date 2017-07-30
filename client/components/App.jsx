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
        <div className='navbar'>
          <h1>MyLocal Space</h1>
          <a href='/index.html'><img className='icon' src='home.png'/></a>
        </div>
        <Map />
      </div>
    )
  }
}

export default App
