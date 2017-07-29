import request from 'superagent'

export function getLocations (appCode, appId) {
  return request
    .get('https://places.demo.api.here.com/places/v1/discover/explore?at=-36.848461%2C174.763336&cat=natural-geographical%2Csights-museums&app_id=WQcyXkJedeP70Lnay6rs&app_code=EnkpwctAt48m5uvPDAaovA')
}
