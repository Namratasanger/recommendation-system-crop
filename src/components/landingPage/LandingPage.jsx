import React, { Component } from "react";
import axios from "axios";
import {
  API_SEND_CURRENT_LOCATION,
  API_FETCH_WEATHER,
} from "../../api/ApiEndPoints.js";
import AgricultureMachine from "../../assests/AgricultureMachine.jpg";
import { Grid } from "@material-ui/core";
import "./styles.css";
export default class LandingPage extends Component {
  componentDidMount() {
    this.fetchLocation();
  }

  fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
          this.sendLocation(position);
          this.fetchWeather(position);
        },
        error => this.sendLocation(error)
      );
    }
  };

  sendLocation = position => {
    if (position) {
      axios
        .get(API_SEND_CURRENT_LOCATION, {
          params: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  fetchWeather = position => {
    if (position) {
      axios
        .get(API_FETCH_WEATHER, {
          params: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  render() {
    return (
      <div>
        <Grid container>
          <Grid item>
            <img src={AgricultureMachine} className='images' />
          </Grid>
        </Grid>
      </div>
    );
  }
}
