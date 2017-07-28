import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )
})

Notification.requestPermission().then(function(permission) {
  console.log(permission)
  console.log("Notification permission granted")
  if (Notification.permission === "granted") {
    var notification = new Notification("Hi there!");
  }
});
