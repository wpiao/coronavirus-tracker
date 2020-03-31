import React from 'react';

const List = ({ data, dateTime }) => (
  <div>
  <h2>Coronavirus Info by State as of {dateTime}</h2>
    <div className="phrases">
      <div className="phrase-table">
        <div className="phrase-header phrase-row">
          <div className="phrase-data">State</div>
          <div className="phrase-data">Confirmed</div>
          <div className="phrase-data">Deaths</div>
          <div className="phrase-data">Recovered</div>
        </div>
        {Object.keys(data).sort().map((state, index) => {
          return (
            <div className="phrase-row" key={index}>
              <div className="phrase-data">{state}</div>
              <div className="phrase-data">{data[state].confirmed}</div>
              <div className="phrase-data">{data[state].deaths}</div>
              <div className="phrase-data">{data[state].recovered}</div>
            </div>
          ) 
        })}
      </div>
    </div>
</div>
);

export default List;