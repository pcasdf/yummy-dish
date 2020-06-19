import React from 'react';
import './tabs.styles.scss';

const Tabs = ({ children }) => {
  return (
    <div className="outerContainer">
      <div className="title">{children}</div>
    </div>
  );
};

export default Tabs;
