import React from 'react';
import { Link } from 'react-router-dom';
import '../highlight/highlight.styles.scss';

function Highlight(props) {
  return (
    <Link to={`/recipes/${props.id}`}>
      <div className='RecipeRender'>
        <img className='Image' src={props.img} />
        <span>{props.title}</span>
      </div>
    </Link>
  );
}

export default Highlight;
