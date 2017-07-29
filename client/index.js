import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

import {showNotification} from './notify.js'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )
})

/*
function showNotification() {
  document.getElementById('debug').innerHTML += "<br>showing"
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      document.getElementById('debug').innerHTML += "<br>granted"
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Vibration Sample', {
          body: 'Buzz! Buzz!',
          icon: '../images/touch/chrome-touch-icon-192x192.png',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: 'vibration-sample'
        });
      });
    }
  });
}
*/


if("serviceWorker" in navigator) {
  document.getElementById('debug').innerHTML += "<br>sw enabled"
  navigator.serviceWorker.register('sw.js').then(function(reg) {
    document.getElementById('debug').innerHTML += "<br>registered"
    console.log("registered")
    setTimeout(showNotification, 1000)
  }).catch(function(error) {
    // registration failed
      document.getElementById('debug').innerHTML += "<br>failed:" + error
    console.log('Registration failed with ' + error);
  })
}
