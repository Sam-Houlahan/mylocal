import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

const applicationPublicKey = 'BFwsrEdIy5_mZyUYdFQFPnUJe_IkmUSBMjsMnqg1rCZQcpi6So7Pw8UAwnkgokzaHYBvN-spnl0sE9MZjvYhgiA'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )
})

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Push notifications service worker code
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw-test/sw.js', {scope: '/sw-test/'})
  .then(function(reg) {
    // registration worked
    console.log('Registration succeeded. Scope is ' + reg.scope);
    console.log(reg)

    console.log(reg.pushManager)

    var options = {
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array(applicationPublicKey)
    }

    reg.pushManager.subscribe(options)
    .then(function(subscription) {
      console.log('User is subscribed.');

      Notification.requestPermission().then(function(permission) {
        console.log(permission)
        console.log("Notification permission granted")
        if (Notification.permission === "granted") {
          // If it's okay let's create a notification
          var notification = new Notification("Hi there!");
        }
      });

    })
    console.log(reg.pushManager)


    /*​reg.pushManager.subscribe().then(
      function(pushSubscription) {
        console.log("got push");
        console.log(pushSubscription);
      }, function(error) {
        // During development it often helps to log errors to the
        // console. In a production environment it might make sense to
        // also report information about errors back to the
        // application server.
        console.log(error);
      });
    */

  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}
