import React, { Component } from "react";
import {
  Select,
  MenuItem,
  Typography,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Tab,
} from "@material-ui/core";
import withStyles from "./style.js";
import "./styles.css";
const SEASON_LIST = [
  {
    name: "Summer",
  },
  {
    name: "Rainy",
  },
  {
    name: "Winter",
  },
];

const STATE_LIST = [
  {
    name: "Gujarat",
  },
  {
    name: "Madhya Pradesh",
  },
  {
    name: "Punjab",
  },
  {
    name: "Rajasthan",
  },
];

const DISTRICT_LIST = [
  {
    Gujarat: [
      { name: "Ahmedabad" },
      { name: "Gandhinagar" },
      { name: "Vadodra" },
    ],
  },
  {
    "Madhya Pradesh": [
      { name: "Bhopal" },
      { name: "Gwalior" },
      { name: "Indore" },
    ],
  },
  {
    Punjab: [{ name: "Amritsar" }, { name: "Hoshiarpur" }, { name: "Patiala" }],
  },
  {
    Rajasthan: [{ name: "Jaipur" }, { name: "Jaisalmer" }, { name: "Udaipur" }],
  },
];

const CROP_DATA = [
  {
    Gandhinagar: [
      {
        area: 2439.6,
        production: 3415.44,
        yield: 1.4,
        crop: "Arecanut",
      },
      {
        area: 1254.0,
        production: 2000.0,
        yield: 1.4,
        crop: "Black pepper",
      },
      {
        area: 3540.0,
        production: 9490.0,
        yield: 6.220381088,
        crop: "Coconut ",
      },
      {
        area: 1232.5,
        production: 16560.0,
        yield: 13.43610548,
        crop: "Ginger",
      },
      {
        area: 8140.0,
        production: 16600.0,
        yield: 2.039312039,
        crop: "Rice",
      },
    ],
  },
  {
    Bhopal: [
      {
        area: 2439.6,
        production: 3415.44,
        yield: 1.4,
        crop: "Arecanut",
      },
      {
        area: 1254.0,
        production: 2000.0,
        yield: 1.4,
        crop: "Black pepper",
      },
      {
        area: 3540.0,
        production: 9490.0,
        yield: 6.220381088,
        crop: "Coconut ",
      },
      {
        area: 1232.5,
        production: 16560.0,
        yield: 13.43610548,
        crop: "Ginger",
      },
      {
        area: 8140.0,
        production: 16600.0,
        yield: 2.039312039,
        crop: "Rice",
      },
    ],
  },
];

const TABLE_HEADERS = [
  { name: "Area" },
  { name: "Production" },
  { name: "Yield" },
  { name: "Crop" },
];

class CropRecommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seasonIndex: SEASON_LIST[0].name,
      stateIndex: STATE_LIST[0].name,
      districtList: DISTRICT_LIST[0].Gujarat,
      districtIndex: "Ahmedabad",
    };
  }

  handleSeasonChange = event => {
    this.setState({
      seasonIndex: event.target.value,
    });
  };

  handleStateChange = event => {
    this.setState(
      {
        stateIndex: event.target.value,
      },
      () => {
        DISTRICT_LIST.map(values =>
          Object.keys(values)[0] === this.state.stateIndex
            ? this.setState(
                { districtList: values[this.state.stateIndex] },
                () => {
                  this.setState({
                    districtIndex: this.state.districtList[0].name,
                  });
                }
              )
            : null
        );
      }
    );
  };

  handleDistrictChange = event => {
    this.setState({
      districtIndex: event.target.value,
    });
  };

  render() {
    var { seasonIndex, stateIndex, districtList, districtIndex } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <div className='header'>
          <div className='logo'>Logo</div>
          <div className='rightSection'>
            <div className='service'>About</div>
            <div className='service'>Service</div>
          </div>
        </div>
        <div className='body'>
          <Select
            value={seasonIndex}
            onChange={event => {
              this.handleSeasonChange(event);
            }}
            style={{ width: "200px", marginRight: "20px", fontSize: "18px" }}
          >
            {SEASON_LIST.map(seasons => (
              <MenuItem value={seasons.name}>
                <Typography>{seasons.name}</Typography>
              </MenuItem>
            ))}
          </Select>

          <Select
            value={stateIndex}
            onChange={event => {
              this.handleStateChange(event);
            }}
            style={{ width: "200px", marginRight: "20px", fontSize: "18px" }}
          >
            {STATE_LIST.map(state => (
              <MenuItem value={state.name}>
                <Typography>{state.name}</Typography>
              </MenuItem>
            ))}
          </Select>
          <Select
            value={districtIndex ? districtIndex : "Please select a state"}
            onChange={event => {
              this.handleDistrictChange(event);
            }}
            style={{ width: "200px", marginRight: "20px", fontSize: "18px" }}
            disabled={districtIndex === null ? true : false}
          >
            {districtList !== null ? (
              districtList.map(district => (
                <MenuItem value={district.name}>
                  <Typography>{district.name}</Typography>
                </MenuItem>
              ))
            ) : (
              <MenuItem value={"Please select a state"} disabled>
                <Typography>Please select a state</Typography>
              </MenuItem>
            )}
          </Select>
          {DISTRICT_LIST.map(values =>
            Object.keys(values)[0] === stateIndex
              ? console.log(values[stateIndex])
              : null
          )}

          <TableContainer className={classes.table}>
            <Table stickyHeader>
              <TableHead className={classes.tableHeader}>
                <TableRow className={classes.tableHeaderRow}>
                  {TABLE_HEADERS.map(headers => (
                    <TableCell className={classes.tableHeaderRowColumn}>
                      {headers.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {CROP_DATA.map(
                  values =>
                    values[districtIndex] &&
                    values[districtIndex].map(data => (
                      <TableRow>
                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px " }}
                        >
                          {data.area}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          {data.production}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          {data.yield}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          {data.crop}
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(CropRecommendation);
