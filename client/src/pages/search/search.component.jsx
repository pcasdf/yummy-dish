import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Link } from 'react-router-dom';

import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';

import detailsJSON from '../../data/details-1.json';
import TagsInput from './TagsInput';
import Pricing from './Pricing';
import PrepTime from './PrepTime';
import Skill from './Skill';

import './search.styles.scss';
import SearchHeader from './search.header.component';
import Header from '../../components/header/header.component';

function Search(props) {
  const [tags, setTags] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [priceInputValue, setpriceInputValue] = useState(1);

  const [prepTime, setPrepTime] = useState(50);
  const [skillLevel, setSkillLevel] = useState(10);

  const [anchorEl, setAnchorEl] = useState(null);

  const [value, setValue] = useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApply = () => {
    const filtered = filterSearch(details);
    const filteredResults = filtered
      .filter(
        (detail) =>
          parseInt(priceInputValue) * 100 < detail.pricePerServing &&
          detail.pricePerServing < (parseInt(priceInputValue) + 1) * 100
      )
      .filter(
        (detail) =>
          (parseInt(prepTime) + 1) * 30 >
          parseInt(detail.preparationMinutes) + parseInt(detail.cookingMinutes)
      )
      .filter(
        (detail) =>
          (parseInt(skillLevel) + 1) * 10 > detail.extendedIngredients.length
      )
      .filter(
        (detail) =>
          detail.spoonacularScore <= value * 20 + 10 &&
          detail.spoonacularScore >= value * 19
      );

    setSearchResults(filteredResults);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const details = detailsJSON;

  const filterSearch = (data) => {
    let next = [];
    data.forEach((item) => {
      if (
        tags.reduce(
          (acc, curr) => acc && item.title.toLowerCase().includes(curr),
          true
        )
      ) {
        next.push(item);
      }
    });
    return next;
  };

  useEffect(() => {
    if (tags.length) {
      let next = [];
      searchResults.forEach((item) => {
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

  let location = useLocation();
  return (
    <>
      <div className='searchHeader'>
        <SearchHeader>
          <div className='searchBarWithButton'>
            <TagsInput tags={tags} setTags={setTags}></TagsInput>

            <button className='refineButton' onClick={handleClick}>
              Refine ^
            </button>
          </div>
        </SearchHeader>
      </div>

      <div className='all-Search-Results'>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          font-color='orange'
        >
          <PrepTime setPrepTime={setPrepTime} />
          <Pricing setpriceInputValue={setpriceInputValue} />
          <Skill setSkillLevel={setSkillLevel} />

          <Box component='fieldset' mb={3} borderColor='transparent'>
            <div className='slider'>
              <Typography component='legend'>Rating</Typography>
            </div>
            <Rating
              name='simple-controlled'
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </Box>

          <button className='applyButton' onClick={handleApply}>
            Apply
          </button>
        </Popover>

        {searchResults.map((item) => (
          <>
            <div className='searchResults'>
              <div className='rectangle'>{item.title}</div>
              <Link to={`/recipes/${item.id}`}>
                <img className='searchImage' src={item.image} />
              </Link>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default Search;
