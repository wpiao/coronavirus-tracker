const express = require('express');
const path = require('path');
const axios = require('axios');
const { stateAbbr } = require('./stateAbbr.js');

const PORT = 3000;
const app = express();

// static files route
app.use(express.static(path.join(__dirname, '/../client/dist')));

// get coronavirus confirmed case data from https://api.covid19api.com/live/country/us/status/confirmed/date/2020-03-21T13:13:30Z
app.get('/api/data', (req, res) => {
  // format date in right format for api endpoint. Example: 2020-03-31T04:40:36Z
  const today = new Date();
  const yesterday = today;
  yesterday.setDate(today.getDate() - 1);
  let date = yesterday.toISOString();
  date = date.slice(0, 11) + '00:00:00Z';

  // get data for confirmed case for recent two days
  axios.get(`https://api.covid19api.com/live/country/us/status/confirmed/date/${date}`)
    .then((response) => {
      console.log(date);
      console.log(response);
      // filter data to only get most recent data
      const latestUpdateTime = response.data[response.data.length - 1].Date;
      processData(response.data, latestUpdateTime);
      result.date = latestUpdateTime;
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      res.send('Failed to retrieve confirmed case data!');
    })
});

const result = {};
// this helper function is for transforming data to right format
// this helper function only adds confirmed cases data to result
const processData = (data, mostRecentUpdateTime) => {
  for (let i = 0; i < data.length; i++) {
    let currentData = data[i];
    // only add most recent data to result
    if (currentData.Date === mostRecentUpdateTime) {
      // exclude U.S territories, only for 50 states and DC
      if (stateAbbr[currentData.Province]) {
        const stateCoronavirusData = {};
        stateCoronavirusData.confirmed = currentData.Confirmed;
        stateCoronavirusData.deaths = currentData.Deaths;
        stateCoronavirusData.recovered = currentData.Recovered;
        stateCoronavirusData.active = currentData.Active;
        result[currentData.Province] = stateCoronavirusData;
        // need state abbreviation for Datamap library in front-end
        result[currentData.Province].abbr = stateAbbr[currentData.Province];
      }
    } 
  }
  return result;
};

app.listen(PORT, () => console.log(`app listening on port ${PORT}!`));


