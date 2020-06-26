- [Project Planning](#project-planning)
  - [Overview](#overview)
  - [Wireframes](#wireframes)
  - [MVP](#mvp)
    - [Goals](#goals)
    - [Libraries](#libraries)
    - [Data](#data)
    - [Component Hierarchy](#component-hierarchy)
    - [Component Breakdown](#component-breakdown)
    - [Component Estimates](#component-estimates)
    - [Helper Functions](#helper-functions)
  - [Post-MVP](#post-mvp)
- [Project Delivery](#project-delivery)
  - [Code Showcase](#code-showcase)
  - [Code Issues & Resolutions](#code-issues--resolutions)

## Project Planning

### Overview

**Yummy Dish**<br>
some link goes here

**Yummy Dish** is a recipe app.

<br>

### Wireframes

![Main](src/assets/mockups/main.jpg)

- Main

![Detail](src/assets/mockups/detail.jpg)

- Detail

<br>

### MVP

- Yummy Dish allows user to browse recipes and search recipes
- Users will have the ability to register accounts and sign in to their account
- Users can save recipes and leave comments after signing in
- Users can browse saved recipes in my-recieps-page
- Users can view recipe details and print in recipe-details-page
- Users can go from recipe-details-page to cook-mode-page
- Prep steps and directions are broken down in code-mode page, users can check off steps as they go.
- Users can create/view/delete a review in cook-mode-page
- Users can read/update/delete reviews in my-reviews-page

<br>

#### Goals

- have fully functioning app
- seamless user experience
- everything you see works the way they are expected to

<br>

#### Libraries

|   Library    | Description                                                           |
| :----------: | :-------------------------------------------------------------------- |
| React Router | _Allow for routing to different pages of the app without page reload_ |
| Material UI  | _Nice UI component library for more stremalined interface_            |
|    Axios     | _Nice library for making HTTP requests_                               |
|   mongoose   | _library to make backend easier_                                      |
| jsonwebtoken | _library for user authentication_                                     |

<br>

#### Component Hierarchy

```
src
|__ assets/
      |__ icons
|__ client/
      |__ assets/
      |__ data/
            |__ details.json
      |__ contexts/
            |__ user.context.js
      |__ components/
            |__ bookmark-modal
            |__ cook-mode-components
            |__ footer
            |__ header
            |__ highlight
            |__ results
            |__ reviews
            |__ search-bar
            |__ tabs
      |__ pages/
            |__ account
            |__ bookmarks
            |__ cook-mode
            |__ homepage
            |__ recipe
            |__ search
                  |__search-components
      |__ services/
            |__ apiConfig
            |__ users
|__ server/
      |__ controllers/
            |__ auth.js
            |__ reviews.js
            |__ users.js
      |__ db/
            |__ connection.js
      |__ middleware/
            |__ auth.js
      |__ models/
            |__ review.js
            |__ user.js
      |__ routes/
            |__ review.js
            |__ user.js
```

<br>

#### Component Breakdown

| Component |    Type    | State | Props | Description                                                                |
| :-------: | :--------: | :---: | :---: | :------------------------------------------------------------------------- |
|  Header   | functional |   n   |   n   | _The header will contain the navigation and logo._                         |
|   Main    | functional |   y   |   n   | _The main will be the landing page and display the current data in state._ |
| Trending  | functional |   n   |   y   | _Trending will fetch and show the currently trending series_               |
|  Search   | functional |   n   |   y   | _Search will be in the header component and will fetch data_               |
|  Detail   | functional |   n   |   y   | _Detail will render specific detail about the selected series_             |
|  Footer   | functional |   n   |   n   | _The footer will show info about me and a link to my portfolio._           |

<br>

### Post-MVP

- _more styling_

<br>

---

## Project Delivery

### Code Showcase

For Estevan

```
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
```

For Peter

```
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
```

For Kate

```
  const labels = {
    0.5: '💩',
    1: '🤮',
    1.5: '🤢',
    2: '🤬',
    2.5: '👎',
    3: '😐',
    3.5: '👌',
    4: '👍',
    4.5: '😋',
    5: '😍'
  };
```

For Olu

```
const toggleTheme = (number) => {
    if (number === 1) {
      setTheme({
        header: ‘#FEC368’,
        background: ‘#CBF3F0’,
        bookmarkBackground: ‘#FEC368’,
        snacks: ‘#EFFBFA’,
        text: ‘black’,
        recipeBoxShadow: ‘-1px 1px 14px -4px rgba(0,0,0,0.75)‘,
        seeMyRecipeBtn: ‘#FEC368’,
        loginBtn: ‘#F89A1C’,
        recipeText: ‘#8E8E8E’,
        cookModeFooter: ‘`${footerColor}`‘,
        prepBG: ‘#CBF3F0’,
        cookBG: ‘ADD6B7’
      });
    } else if (number === 2) {
      setTheme({
        header: ‘#424242’,
        background: ‘#212121’,
        bookmarkBackground: ‘#212121’,
        snacks: ‘#444’,
        text: ‘#F5F5F5’,
        recipeBoxShadow: ‘-1px 1px 14px -4px rgba(255,255,255,1)‘,
        seeMyRecipeBtn: ‘#FEC368’,
        loginBtn: ‘#F89A1C’,
        recipeText: ‘#F7F7F7’,
        cookModeFooter: ‘#424242’,
        prepBG: ‘#212121’,
        cookBG: ‘#B1B1B1’
      });
    } else {
      setTheme({
        header: ‘#00665C’,
        background: ‘#515151’,
        bookmarkBackground: ‘#515151’,
        snacks: ‘#444’,
        text: ‘#F5F5F5’,
        recipeBoxShadow: ‘-1px 1px 14px -4px rgba(255,255,255,1)‘,
        seeMyRecipeBtn: ‘#FC8B56’,
        loginBtn: ‘#FC8B56’,
        recipeText: ‘#CFCFCF’,
        cookModeFooter: ‘#00665C’,
        prepBG: ‘#515151’,
        cookBG: ‘#B1B1B1’
      });
    }
  };
```

For Wannamaker

```
const checkReviews = async () => {
    if (user) {
      try {
        const allRev = await getUserReviews(
        user._id)
        console.log(allRev)
        setReviews(allRev)
         console.log(reviews)
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(() => {
    checkReviews()
  }, [])
```

### Code Issues & Resolutions

This project was a tremendous learning experience in using Material UI, setting up dynamic routes, and properly structuring my component hierarchy to take advantage of the routes that I had set up. I didn't stumble across any major issues during development, but I had to read a lot of documentation to learn how to use some of the libraries that I ended up using for transition effects.
