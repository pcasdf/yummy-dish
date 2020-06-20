

import React, { useState, useEffect } from "react";
import detailsJSON from "../../data/details-1.json"
import recipesJSON from "../../data/recipes-1.json"
import TagsInput from './TagsInput';


function Search() {
  const [tags, setTags] = useState([])
  // const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // const handleChange = (e) => {
  //   setSearchTerm(e.target.value)
  // }

  
    const details = detailsJSON
    const recipes = recipesJSON
  console.log(details)
  console.log(recipes)


  
  // useEffect(() => {
  //   const results = details.filter(detail =>
  //     detail.title.toLowerCase().includes(tags)
  //   );
  //   setSearchResults(results);
  // }, [tags]);

  useEffect(() => {
    if (tags.length) {
      let next = [];
      details.forEach(item => {
        if (
          tags.reduce(
            (acc, curr) => acc && item.title.toLowerCase().includes(curr),
            true
          )
        ) {
          next.push(item);
        }
      });
      setSearchResults(next);
    } else {
      setSearchResults(details);
    }
}, [tags]);

  return (
    
    <div className="Search">
      <TagsInput 
        
        // value={searchTerm}
        // onChange={handleChange}
        tags={tags}
        setTags={setTags}
     
      
      
      />
     
      <ul>
        {searchResults.map(item => (
           <>
          <div>{item.title}</div>
            <img src={item.image} />
            </>
           
           
        ))}
        
      </ul>
      
      </div>
      
  );
}

export default Search;
