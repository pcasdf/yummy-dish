import React from 'react';
import { Link } from 'react-router-dom';
import '../highlight/highlight.styles.scss';

function Highlight(props) {
  return (
    <Link className='link-container' to={`/recipes/${props.id}`}>
      <div className='RecipeRender'>
        <div
          className='bgImage'
          style={{ backgroundImage: `url(${props.img})` }}
        />
      </div>
      <span>{props.title}</span>
    </Link>
  );
}

export default Highlight;
