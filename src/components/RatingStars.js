import React from 'react';

const range = (start, end) => {
  let result = []
  for (let i = start; i < end; i++) {
    result.push(i);
  }

  return result;
}

export default props => (
  <div className="columns is-mobile is-gapless">
    {range(0, 5).map(e => (
      <div key={e} className="column is-narrow">
        <span className={`icon ${e + 1 <= props.rating ? 'has-text-warning' : ''}`}>
          <i className="fa fa-star"></i>
        </span>
      </div>
    ))}
  </div>
);
