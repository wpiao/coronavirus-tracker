import React, { Component } from 'react';
import axios from 'axios';
import List from './List.jsx';
import Map from './Map.jsx';
import colorScaleData from '../colorScaleData.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'list',
      data: {},
      mapData: {},
      renderMap: false,
      dateTime: '',
      confirmed: '-',
      deaths: '_',
      recovered: '_'
    };
  }

  componentDidMount() {
    this.getData();
  }

  changeView(option) {
    this.setState({
      view: option
    });
  }

  getData() {
    axios.get('/api/data')
      .then((response) => {
        const dateTime = response.data.date;


        // transform data for Map component
        const mapData = {};
        Object.keys(response.data).sort().map((state) => {
          mapData[response.data[state].abbr] = response.data[state];
        });
        delete mapData.undefined;


        // calculate total confirmed and deaths case
        let totalConfirmed = 0;
        let totalDeaths = 0;
        for (let key in mapData) {
          totalConfirmed += mapData[key].confirmed;
          totalDeaths += mapData[key].deaths;
        }


        // transform data for List component
        const listData = response.data;
        delete listData.date;


        // set the state with new data
        this.setState({
          dateTime: dateTime,
          data: listData,
          mapData: mapData,
          confirmed: totalConfirmed,
          deaths: totalDeaths
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    const { view, data, dateTime, mapData, confirmed, deaths} = this.state;
    return (
      <div>
        <div className="nav">
          <span className="logo">Coronavirus Tracker</span>
          <span className={view === 'list'
            ? 'nav-selected'
            : 'nav-unselected'}
          onClick={() => this.changeView('list')}>
            List
          </span>
          <span className={view === 'map'
            ? 'nav-selected'
            : 'nav-unselected'}
          onClick={() => {
            this.changeView('map');
            this.setState({
              renderMap: true
            })
          }}>
            Map
          </span>
        </div>

        <div className="main">
          {view === 'list'
            ? <List data={data} dateTime={dateTime} confirmed={confirmed} deaths={deaths} />
            : <Map finalData={colorScaleData(mapData)} dateTime={dateTime} confirmed={confirmed} deaths={deaths} />
          }
        </div>
      </div>
    );
  }
}

export default App;