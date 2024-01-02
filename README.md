# Welcome to Seediy!

#### This is an _in progress_ project. Some features are planned, or only partially functional. Please excuse the dust during development!

Seediy (pronounced see-dee) is an all inclusive app designed to make you a better gardener. Anyone can "diy" their garden with our seeDIY app. Some key features include a seed inventory tracker, harvest tracker, shopping list and weather forecaster.

### Project Build:

- FastAPI
- OAuth 2.0
- React (JS)
- Redux Tool Kit

### Current Features

- User
  - User account creation
  - Stores user's zone, longitude and latitude based on input zipcode
- Home Page
  - Weather widget
    - Shows weather for the user's specified area
- Seed Inventory
  - Track your current seed inventory
- Shopping List
  - Add or remove seeds from your shopping list (must be in inventory)
  - Links to URL provided when adding the seed to your inventory
- Harvest Tracker
  - When "planting" a plant it is automatically added to your harvest list, will track amount of days until the estimated harvest.
  - Harvesting the plant moves it to an archive of plants, so you can see your planted history

### Future of the App

Seediy is currently a _work in progress_. Estimated MVP completion: February 2024

**Some planned features:**

- Garden Planner
  - Allows users to draw out their garden space and add plants to it. The plants will track in the harvest tracker, and are tied to the seed inventory
- Allow for adding of plants that are not tied to a particular seed (perhaps purchased from a nursery)
- Instaseed
  - Social media for posting images of gardens! Allows for the OP to post a picture with a location and a season.
- Blogs
  - Blog section for posting questions / information and commenting on other posts
- Harvest Tracker
  - Calendar providing a visual look at when your plants (may) be ready to harvest
  - Calculator for "if I plant this today"
- Additional seed tracking
  - Added sections for vegetables, fruit, flowers, ornamentals and houseplants
- Weather page
  - A page with weather information for the user's input zip code
  - Customizable widgets to see information important to the user
- User page
  - Edit user information
- Calculate first/last frost dates based upon the user's zipcode.
- Shopping List Updates
  - Add ability to add an item that you don't have in your inventory
