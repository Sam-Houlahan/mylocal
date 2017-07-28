console.log("sw")
this.addEventListener('install', function(event) {
  console.log("installing")
});

self.addEventListener('activate', function(event) {
  console.log('V1 now ready to handle fetches!');
});
