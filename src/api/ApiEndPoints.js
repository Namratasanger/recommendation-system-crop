//base URL
const API_BASE_URL = "http://169.51.195.137:30001/api/v1/";

//sending the current location of the user
export const API_SEND_CURRENT_LOCATION = API_BASE_URL + "locations/get-address";
//fetching current weather
export const API_FETCH_WEATHER = API_BASE_URL + "weather/current";
//fetch top picks for the user based on it's district,season,state
export const API_FETCH_PREDICTIONS = API_BASE_URL + "crops/recommend";
