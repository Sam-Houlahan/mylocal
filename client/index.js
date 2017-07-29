import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import {getLocations, getUserLocation} from './api'

var locations = []
var userPosition = {latitude: 0, longitude: 0}
var shownLocations = []

function notify(title, body) {
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification(title, {
          body: body,
          icon: '',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: ''
        });
      });
    }
  });
}

function degreesToRadians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function distanceBetween(positionA, positionB) {
    var R = 6371e3; // metres
    var radLatA = degreesToRadians(positionA.latitude);
    var radLatB = degreesToRadians(positionB.latitude);
    var deltaLat = degreesToRadians(positionB.latitude-positionA.latitude);
    var deltaLon = degreesToRadians(positionB.longitude-positionA.longitude);

    var a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
            Math.cos(deltaLat) * Math.cos(deltaLat) *
            Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
    return d
}

function checkForProximity() {
    console.log(userPosition)
    document.getElementById("debug").innerHTML += userPosition.latitude + "," + userPosition.longitude + "<br />"

    for(var i = 0; i < locations.length; i++) {
        var locationPos = {
            latitude: locations[i].position[0],
            longitude: locations[i].position[1]
        }
        if(distanceBetween(userPosition, locationPos) <= 50) {
            var hasShown = false
            for(var s = 0; s < shownLocations.length; s++) {
                if(locationPos.latitude === shownLocations[s].position.latitude && locationPos.longitude === shownLocations[s].position.longitude) {
                    hasShown = true
                    break
                }
            }
            if(hasShown === false) {
                console.log("NEARBY:", locations[i])
                notify(locations[i].title, "Nearby")
                shownLocations.push({
                    position: locationPos,
                    timestamp: Math.round(Date.now() / 1000)
                })
            }
        }
    }
}

function refreshUserPosition() {
    console.log("Refresh")
    getUserLocation(function(position) {
        userPosition = position
        checkForProximity()
    })
}


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )
})

if("serviceWorker" in navigator) {
  navigator.serviceWorker.register('sw.js').then(function(reg) {
    console.log('Registraion succeeded')
    notify("Notification Title", "Test body")
  }).catch(function(error) {
    console.log('Registration failed with ' + error);
  })
}

var refresher

/*
getLocations().then(function(res) {
    locations = res.body.results.items
}).then(function() {
    refreshUserPosition()
    refresher = setInterval(refreshUserPosition, 10000)
})
*/

var watchID = navigator.geolocation.watchPosition(function(position) {
    userPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    }
    console.log("watched")
    checkForProximity();
}, function(err) {
    console.log(err);
}, {
    enableHighAccuracy: true,
    maximumAge: 3000, 
    timeout: 2700
});


console.log("index.js loaded")

/*
var posA = {
    latitude: -36.708,
    longitude: 174.662
}

 
var posB = {
    latitude: -36.742,
    longitude: 174.670
}

console.log(distanceBetween(posA, posB))
*/