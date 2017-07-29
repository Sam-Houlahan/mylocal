import request from 'superagent'

export function getLocations (lat, lng) {
  return request
    .get(`https://places.demo.api.here.com/places/v1/discover/explore?at=${lat}%2C${lng}&cat=natural-geographical%2Csights-museums&app_id=WQcyXkJedeP70Lnay6rs&app_code=EnkpwctAt48m5uvPDAaovA`)
}
