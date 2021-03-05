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
  { Gujarat: [{ name: "gandhinagar" }] },
  { "Madhya Pradesh": [{ name: "gandhinagar" }] },
  { Punjab: [{ name: "gandhinagar" }] },
  { Rajasthan: [{ name: "gandhinagar" }] },
];

const TABLE_COLUMNS = [
  {
    header: "",
  },
];
export default class CropRecommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seasonIndex: SEASON_LIST[0].name,
      stateIndex: STATE_LIST[0].name,
      districtList: null,
    };
  }

  handleSeasonChange = event => {
    this.setState(
      {
        seasonIndex: event.target.value,
      },
      () => {
        DISTRICT_LIST.map(values =>
          Object.keys(values)[0] === this.state.stateIndex
            ? console.log(values[this.state.stateIndex])
            : null
        );
      }
    );
  };

  handleStateChange = event => {
    this.setState({
      stateIndex: event.target.value,
    });
  };

  render() {
    var { seasonIndex, stateIndex } = this.state;
    return (
      <div>
        <Select
          value={seasonIndex}
          onChange={event => {
            this.handleSeasonChange(event);
          }}
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
        >
          {STATE_LIST.map(state => (
            <MenuItem value={state.name}>
              <Typography>{state.name}</Typography>
            </MenuItem>
          ))}
        </Select>
        {DISTRICT_LIST.map(values =>
          Object.keys(values)[0] === stateIndex
            ? console.log(values[stateIndex])
            : null
        )}
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow></TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
