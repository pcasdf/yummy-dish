import React from 'react'
 
function Highlight(props) {
  return (
    <div className="RecipeRender">
      <img className="Image" src={props.img} />
      <span >{props.title}</span>
    </div>
  )
}

export default Highlight