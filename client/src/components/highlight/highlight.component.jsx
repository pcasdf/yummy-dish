import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../highlight/highlight.styles.scss';
import { UserContext } from '../../contexts/user.context';
import { ThemeContext } from '../../contexts/theme.context';

function Highlight(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <Link className='link-container' to={`/recipes/${props.id}`}>
      <div className='RecipeRender'>
        <div
          className='bgImage'
          style={{ backgroundImage: `url(${props.img})`, boxShadow: theme.recipeBoxShadow }}
        />
      </div>
      <span style={{color: theme.text}}>{props.title}</span>
    </Link>
  );
}

export default Highlight;
