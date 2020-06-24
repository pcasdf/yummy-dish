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

const Tabs = ({ children, bookmarks, index }) => {
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

  let tabColor;
  if (index===0) {tabColor = '#ff9f1c'}
  else if (index===1) {tabColor = '#ffb44e'}
  else if (index===2) {tabColor = '#fec373'}
  else if (index===3) {tabColor = '#fdd196'}
  else if (index===4) {tabColor = '#dfcf9b'}
  else if (index===5) {tabColor = '#c2cda0'}
  else if (index===6) {tabColor = '#a4cba4'}
  else if (index===7) {tabColor = '#87c9a9'}
  else if (index===8) {tabColor = '#69c7ad'}
  else if (index===9) {tabColor = '#4cc6b2'}
  else if (index===10) {tabColor = '#2ec4b6'}




  return (
    <div className='outerContainer'>
      <ExpansionPanel style={{ backgroundColor: 'transparent' }}>
        <ExpansionPanelSummary
          className='tabs'
          style={{
            backgroundColor: tabColor,
            color: '#fff',
            width: '20vw',
            borderRadius: '0.667vw',
            boxShadow: '0.250em -0.500em 1.063em -0.750em rgba(0,0,0,0.75)',
          }}
        >
          <div className='category'> {children}</div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          className='scroll-panel'
          style={{ backgroundColor: tabColor,
            boxShadow: '-0.133vw -0.8vw 0.667vw -1.067vw rgba(0,0,0,0.75)'
                  }}
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
