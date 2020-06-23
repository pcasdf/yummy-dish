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
  // const oFormula = `${1+(index*(20/100)/-1)}`
  // let opacity, gValue;
  // if (index === 0) {
  //   opacity = 1;
  // } else {
  //   opacity = oFormula;
  //   gValue = index*7;
  // }
  // console.log(opacity)



  // const tabColor = `rgba(255, ${gValue +159}, 28, 1)`;
  let tabColor;
  if (index===0) {tabColor = '#ff9f1c'}
  else if (index===1) {tabColor = '#ffb44e'}
  else if (index===2) {tabColor = '#fec373'}
  else if (index===3) {tabColor = '#fdd196'}
  else if (index===4) {tabColor = '#FDE0BF'}
  else if (index===5) {tabColor = '#fdd196'}

  else if (index===6) {tabColor = '#fdd196'}



  return (
    <div className='outerContainer'>
      <ExpansionPanel style={{ backgroundColor: 'transparent' }}>
        <ExpansionPanelSummary
          className='tabs'
          style={{
            backgroundColor: tabColor,
            color: '#fff',
            width: '20vw',
            borderRadius: '5px'
          }}
        >
          <div className='category'> {children}</div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          className='scroll-panel'
          style={{ backgroundColor: tabColor }}
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
