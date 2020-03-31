// add color propterty to original data for Map component
import _ from 'underscore';

const colorScaleData = (data) => {
  const onlyScores = _.map(data, (item) => item.confirmed);
  const minValue = Math.min.apply(null, onlyScores);
  const maxValue = Math.max.apply(null, onlyScores);
  const paletteScale = d3.scale.linear().domain([minValue, maxValue]).range(['#ffe0cc', '#ff471a']);
  
  let finalData = Object.assign({}, data);
  _.each(finalData, (item) => {
    if (typeof(item) === 'object') {
      item.fillColor = paletteScale(item.confirmed); 
    }
  });

  console.log(finalData);
  return finalData;
};

export default colorScaleData;