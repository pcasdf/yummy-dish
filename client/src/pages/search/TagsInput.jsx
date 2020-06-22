import React, { useState, useEffect } from "react";
import './TagsInput.scss'

const TagsInput = ({tags, setTags }) => {
    
  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }
    
    const removeTags = indexToRemove => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)])
    }
    const addTags = event => {
        if (event.target.value !== "") {
            setTags([...tags, event.target.value])
            setSearchTerm("")
        }
      
    };
    return (
        <div className="tags-input">
            <ul id="tags">
                {tags.map((tag, index) => (
                    <li key={index} className="tag">
                        <span className='tag-title'>{tag}</span>
                        <span className='tag-close-icon'
                            onClick={() => removeTags(index)}
                        >
                            x
                        </span>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
          placeholder=""
          value={searchTerm}
        onChange={handleChange}
            />
        </div>
    )
}

export default TagsInput