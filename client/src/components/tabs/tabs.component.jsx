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

const Tabs = ({ children }) => {
  const { user } = useContext(UserContext);
  console.log(children === user.bookmarks[0].category);
  console.log(user.bookmarks);
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
          {user &&
            user.bookmarks
              .filter((bookmark) => bookmark.category === children)
              .map((item) => {
                const data = Data.find((each) => each.id === +item.recipe);
                console.log(item);
                return (
                  data && (
                    <div className='image-container'>
                      <Link key={data.id} to={`recipe/:${data.id}`}>
                        <div
                          style={{ backgroundImage: `url(${data.image})` }}
                          className='image'
                        />
                      </Link>
                    </div>
                  )
                );
              })}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default Tabs;
