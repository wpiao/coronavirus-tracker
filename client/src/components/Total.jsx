import React from 'react';

const Total = ({ confirmed, deaths }) => (
  <div className="total" >
    <div className="total-child">
      <div className="total-label">Confirmed</div>
      <div className="total-number">{confirmed}</div>
    </div>
    <div className="total-child">
      <div className="total-label">Deaths</div>
      <div className="total-number">{deaths}</div>
    </div>
    <div className="total-child">
      <div className="total-label">Recovered</div>
      <div className="total-number">-</div>
    </div>
  </div>
);

export default Total;