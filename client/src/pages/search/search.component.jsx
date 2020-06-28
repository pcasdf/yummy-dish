import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import detailsJSON from '../../data/details-1.json';
import TagsInput from './components/TagsInput';
import Pricing from './components/Pricing';
import PrepTime from './components/PrepTime';
import Skill from './components/Skill';
import SearchHeader from './components/header.component';
import './search.styles.scss';

function Search() {
  const [tags, setTags] = useState([]);
  const { push } = useHistory();
  const { pathname } = useLocation();

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
          (acc, curr) =>
            acc && item.title.toLowerCase().includes(curr.toLowerCase()),
          true
        )
      ) {
        next.push(item);
      }
    });
    return next;
  };

  useEffect(() => {
    console.log(pathname);
    if (pathname !== '/search') {
      push('/search');
    }

    if (tags.length) {
      let next = [];
      searchResults.forEach((item) => {
        if (
          tags.reduce(
            (acc, curr) =>
              acc && item.title.toLowerCase().includes(curr.toLowerCase()),
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
    // eslint-disable-next-line
  }, [tags]);

  return (
    <div className='all'>
      <div className='ssearchHeader'>
        <SearchHeader>
          <div className='ssearchBarWithButton'>
            <TagsInput tags={tags} setTags={setTags}></TagsInput>

            <button className='srefineButton' onClick={handleClick}>
              Refine ^
            </button>
          </div>
        </SearchHeader>
      </div>

      <div className='sall-Search-Results'>
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
          <div className='popover'>
            <PrepTime setPrepTime={setPrepTime} />
            <Pricing setpriceInputValue={setpriceInputValue} />
            <Skill setSkillLevel={setSkillLevel} />

            <Box component='fieldset' mb={3} borderColor='transparent'>
              <div className='sslider'>
                <Typography component='legend'>Rating</Typography>
              </div>
              <Rating
                className='ratings'
                name='simple-controlled'
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Box>

            <button className='sapplyButton' onClick={handleApply}>
              Apply
            </button>
          </div>
        </Popover>
        <div className='search-body'>
          {searchResults.map((item, index) => (
            <React.Fragment key={index}>
              <div className='ssearchResults'>
                <div className='srectangle'>{item.title}</div>
                <Link to={`/recipes/${item.id}`}>
                  <div
                    className='ssearchImage'
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                </Link>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
