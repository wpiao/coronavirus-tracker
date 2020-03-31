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
      dateTime: ''
    };
    // this.handleClick = this.handleClick.bind(this);
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
        // console.log('mapDate: ', mapData)

        // transform data for List component
        const listData = response.data;
        delete listData.date;
        // console.log('listData: ', listData);

        this.setState({
          dateTime: dateTime,
          data: listData,
          mapData: mapData
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    const { view, data, dateTime, mapData} = this.state;
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
            ? <List data={data} dateTime={dateTime} />
            : <Map finalData={colorScaleData(mapData)} dateTime={dateTime} />
          }
        </div>
      </div>
    );
  }
}

export default App;