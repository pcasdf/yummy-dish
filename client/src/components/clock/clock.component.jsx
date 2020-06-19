import React from 'react';
import PropTypes from 'prop-types';

const Clock = (props) => {
  const center = {
    x: 15,
    y: 15
  };
  const lengths = {
    hour: 9,
    minutes: 12
  };
  const floatingHour = (props.hours % 12) + props.minutes / 60;
  const angle = {
    hour: (2.0 * Math.PI * floatingHour) / 12.0,
    minute: 2.0 * Math.PI * floatingHour
  };

  return (
    <svg viewBox='0 0 30 30' style={{ border: '2px solid black' }}>
      <g id='hands'>
        <line
          style={{ stroke: 'black', strokeWidth: 2 }}
          x1={center.x}
          y1={center.y}
          x2={center.x + lengths.hour * Math.sin(angle.hour)}
          y2={center.y - lengths.hour * Math.cos(angle.hour)}
        />
        <line
          style={{ stroke: 'black', strokeWidth: 2 }}
          x1={center.x}
          y1={center.y}
          x2={center.x + lengths.minutes * Math.sin(angle.minute)}
          y2={center.y - lengths.minutes * Math.cos(angle.minute)}
        />
      </g>
    </svg>
  );
};

Clock.propTypes = {
  hours: PropTypes.number,
  minutes: PropTypes.number
};

Clock.defaultProps = {
  hours: 12,
  minutes: 15
};

export default Clock;
