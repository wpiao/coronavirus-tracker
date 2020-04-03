
import React from 'react';
import ReactDOM from 'react-dom';
import Total from './Total.jsx';

import Datamap from 'datamaps';
import mapConfig from '../map.config.js';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.mapConfig = mapConfig;
    this.mapConfig.data = this.props.finalData;
  }

  componentDidMount() {
    this.dataViz = new Datamap(
      Object.assign({}, this.mapConfig, {
        element: this.myRef.current,
        responsive: true
      })
    );
    this.dataViz.labels();
  }

  render() {
    const { dateTime, confirmed, deaths } = this.props;
    return (
      <div>
        <center><h2>Coronavirus Info by State as of {dateTime}</h2></center>
        <Total confirmed={confirmed} deaths={deaths} />
        <div className="map" ref={this.myRef}></div>
      </div>
    );
  }
}

export default Map;