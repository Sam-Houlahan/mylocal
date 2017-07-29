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
