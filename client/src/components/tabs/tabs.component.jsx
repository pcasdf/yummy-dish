import React from 'react';
import './tabs.styles.scss';
import Data from '../../data/details-1.json';

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core/';

const Tabs = ({ children }) => {
  return (
    <div className='outerContainer'>
      <ExpansionPanel style={{ backgroundColor: 'transparent' }}>
        <ExpansionPanelSummary
          style={{
            backgroundColor: '#ff9f1c',
            color: '#fff',
            width: '20vw',
            borderRadius: '5px'
          }}
        >
          <div className='category'> {children}</div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          className='scroll-panel'
          style={{ backgroundColor: '#ff9f1c' }}
        >
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
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default Tabs;
