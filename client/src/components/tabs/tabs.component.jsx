import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './tabs.styles.scss';
import Data from '../../data/details-1.json';
import { UserContext } from '../../contexts/user.context';

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core/';

const Tabs = ({ children, bookmarks }) => {
  const { user } = useContext(UserContext);
  const stuff = [];
  if (bookmarks) {
    bookmarks.forEach((bookmark) => {
      const filtered = user.bookmarks.filter(
        (each) => each.category === children
      );
      filtered.forEach((item) => {
        if (+item.recipe === bookmark.id) stuff.push(bookmark);
      });
    });
  }

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
          {stuff.map((data) => (
            <div className='image-container'>
              <Link key={data.id} to={`recipes/${data.id}`}>
                <div
                  style={{ backgroundImage: `url(${data.image})` }}
                  className='image'
                />
              </Link>
            </div>
          ))}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default Tabs;
