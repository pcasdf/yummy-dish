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

aMDB will offer search functionality to find details about the requested movie or TV series. The focus of this app is on the interactivity of the interface, allowing for a pleasant user experience. It should be responsive, with most components offering dynamic interaction.

<br>

#### Goals

<br>

#### Libraries

|   Library    | Description                                                           |
| :----------: | :-------------------------------------------------------------------- |
| React Router | _Allow for routing to different pages of the app without page reload_ |
| Material UI  | _Nice UI component library for more stremalined interface_            |
|    Axios     | _Nice library for making HTTP requests_                               |

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

- _Add user account and auth capabilities._
- _Add a watch list._

<br>

---

## Project Delivery

### Code Showcase

This is an event handler function that I had previously written with 4x the amount of code, but Mike helped me refactor it down to the much simpler and more efficient version that's shown here.

```
  const handleChange = (event, newValue) => {
    setValue(newValue);
    const target = event.target.innerText;
    if (lastChecked === '') {
      setChecked({
        ...checked,
        [target]: true
      });
    } else {
      setChecked({
        ...checked,
        [lastChecked]: false,
        [target]: true
      });
    }
    setLastChecked(target);
  };
```

### Code Issues & Resolutions

This project was a tremendous learning experience in using Material UI, setting up dynamic routes, and properly structuring my component hierarchy to take advantage of the routes that I had set up. I didn't stumble across any major issues during development, but I had to read a lot of documentation to learn how to use some of the libraries that I ended up using for transition effects.
