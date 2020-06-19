import React from 'react';
import './tabs.styles.scss';
import Data from '../../data/details-1.json';

const Tabs = ({ children }) => {
  return (
    <div className='outerContainer'>
      <span className='category'>{children}</span>
      <div className='snacks'>
        {Data.map((item) => {
          return (
            <div className='image-container'>
              <div
                style={{ backgroundImage: `url(${item.image})` }}
                className='image'
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
