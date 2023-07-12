import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Grid, Typography, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import axios from "axios";
import {
  API_SEND_CURRENT_LOCATION,
  API_FETCH_WEATHER,
} from "../../api/ApiEndPoints.js";

import Maps from "../maps/Maps.jsx";
import GujaratMaps from "../gujarat/gujaratMaps.jsx";
import RajasthanMaps from "../rajasthan/rajasthanMaps.jsx";
import MadhyaPradeshMaps from "../madhyaPradesh/madhyaPradesh.jsx";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import moment from "moment";
import "./bootstrap.min.css";
import "./fontawesome.min.css";
import "./styles.css";

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationDetails: null,
      weatherDetails: null,
      mounted: false,
      showIndiaMap: true,
      currentState: null,
      showSnackBar: false,
      message: null,
      severity: null,
      errorMessage: null,
    };
    this.showState = this.showState.bind(this);
  }

  //call the function once the location is fetched.
  componentDidMount() {
    this.fetchLocation();
  }

  //fetching the current location of the user
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
    console.log("Position : ", position);
    if (position.code === 1) {
      this.setState({
        mounted: true,
        errorMessage: "Please turn on location to view the data",
      });
      console.log("this.state.showSnackBar", this.state.showSnackBar);
      this.showSnackbar(
        "For better experience please turn on location",
        "error"
      );
    } else if (position.code === 2) {
      this.setState({
        mounted: true,
        errorMessage: "Network error",
      });
      console.log("this.state.showSnackBar", this.state.showSnackBar);
      this.showSnackbar("Please retry, Some error occurred!", "error");
    } else {
      axios
        .get(API_SEND_CURRENT_LOCATION, {
          params: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        })
        .then(res => {
          if (res) {
            this.setState(
              {
                locationDetails: res.data,
              },
              () => {
                this.setState({
                  mounted: true,
                });
              }
            );
          }
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  //fetch the weather details from the api - it will return current temperature
  fetchWeather = position => {
    console.log("Position", position);
    if (position.code !== 2 && position.code !== 1) {
      axios
        .get(API_FETCH_WEATHER, {
          params: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        })
        .then(res => {
          if (res) {
            this.setState({
              weatherDetails: res.data,
            });
          }
          // console.log("Response", res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  showState = stateName => {
    console.log("STATE NAME : ", stateName);
    if (stateName) {
      this.setState({
        currentState: stateName,
        showIndiaMap: false,
      });
    } else {
      this.setState({
        currentState: null,
        showIndiaMap: true,
      });
    }
  };

  showSnackbar = (message, severity) => {
    this.setState({
      message: message,
      severity: severity,
      showSnackBar: true,
    });
  };

  handleClose = () => {
    this.setState({
      message: null,
      severity: null,
      showSnackBar: false,
    });
  };
  render() {
    const {
      weatherDetails,
      locationDetails,
      mounted,
      showIndiaMap,
      currentState,
      showSnackBar,
      severity,
      message,
      errorMessage,
    } = this.state;
    return (
      <div>
        <div className='main-top' id='home'>
          <div className='headder-top'>
            <nav>
              <div id='logo'>
                <h1>
                  <a>Crop Recommendation System</a>
                </h1>
              </div>
              <label for='drop' className='toggle'>
                Menu
              </label>
            </nav>
          </div>
          <div className='main-banner' style={{ marginLeft: "60vw" }}>
            <div className='container'>
              <div className='style-banner'>
                {/* <h4 class='mb-2'>Welcome to Our Farm</h4>
                <h5>Offering Farming Solutions Worldwide</h5> */}
                <Grid container direction='column' align='center'>
                  <Grid item direction='column' display='flex' justify='center'>
                    <Typography
                      style={{
                        fontSize: "3rem",
                        fontFamily: "Fira Sans",
                      }}
                    >
                      {locationDetails
                        ? locationDetails.city
                          ? locationDetails.city
                          : locationDetails.state
                        : "NA"}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      style={{ fontSize: "1rem", fontFamily: "Fira Sans" }}
                    >
                      {moment().format("MMMM DD ,YYYY")}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      style={{
                        fontSize: "80px",
                        fontWeight: "100",
                        fontFamily: "Fira Sans",
                      }}
                    >
                      {weatherDetails ? weatherDetails.temp_c : "NA"}
                      <span
                        style={{
                          position: "absolute",
                          marginTop: "-40px",
                          marginLeft: "-10px",
                        }}
                      >
                        <RadioButtonUncheckedIcon fontSize='small' />
                      </span>
                      <span
                        style={{
                          fontSize: "60px",
                          fontWeight: "0",
                        }}
                      >
                        C
                      </span>
                      /{weatherDetails ? weatherDetails.temp_f : "NA"}
                      <span
                        style={{
                          position: "absolute",
                          marginTop: "-40px",
                          marginLeft: "-10px",
                        }}
                      >
                        <RadioButtonUncheckedIcon fontSize='small' />
                      </span>
                      <span
                        style={{
                          fontSize: "60px",
                          fontWeight: "0",
                        }}
                      >
                        F
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item>
                    {weatherDetails && (
                      <img
                        src={weatherDetails.condition.icon}
                        style={{ width: "100px", marginTop: "-20px" }}
                      />
                    )}
                  </Grid>

                  <Grid item>
                    <Typography
                      style={{ fontSize: "20px", fontFamily: "Fira Sans" }}
                    >
                      {weatherDetails && weatherDetails.condition.text}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography
                      style={{ fontSize: "20px", fontFamily: "Fira Sans" }}
                    >
                      {locationDetails && locationDetails.formatted_address}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
              {/* <div className=' '>
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem
                  ipsum dolor sit amet Lorem ipsum dolor sit amet
                </p>
              </div> */}
            </div>
          </div>
        </div>
        {/* <section className='about py-lg-4 py-md-3 py-sm-3 py-3' id='about'>
          <div className='container py-lg-5 py-md-4 py-sm-4 py-3'></div>
        </section> */}

        {mounted && showIndiaMap && (
          <Maps
            weatherDetails={weatherDetails}
            locationDetails={locationDetails}
            errorMessage={errorMessage}
            changeState={this.showState}
          />
        )}
        {currentState && (
          <div>
            <KeyboardBackspaceIcon
              style={{
                margin: "30px 0px 0px 50px",
                position: "absolute",
                cursor: "pointer",
                color: "rgb(25,118,210)",
              }}
              onClick={() => this.showState()}
            />
            <Typography
              style={{
                margin: "30px 0px 0px 80px",
                position: "absolute",
                cursor: "pointer",
                color: "rgb(25,118,210)",
                fontFamily: "Fira Sans Thin",
                fontWeight: "30px",
                zIndex: 2,
              }}
              onClick={() => this.showState()}
            >
              Back to India Map
            </Typography>
          </div>
        )}
        {currentState && currentState === "gujarat" && (
          <GujaratMaps
            weatherDetails={weatherDetails}
            locationDetails={locationDetails}
          />
        )}
        {currentState && currentState === "rajasthan" && (
          <RajasthanMaps
            weatherDetails={weatherDetails}
            locationDetails={locationDetails}
          />
        )}

        {currentState && currentState === "madhyaPradesh" && (
          <MadhyaPradeshMaps
            weatherDetails={weatherDetails}
            locationDetails={locationDetails}
          />
        )}
        {showSnackBar && (
          <Snackbar
            open={true}
            autoHideDuration={3000}
            onClose={() => this.handleClose()}
          >
            <MuiAlert severity={severity} onClose={() => this.handleClose()}>
              {message}
            </MuiAlert>
          </Snackbar>
        )}
      </div>
    );
  }
}
