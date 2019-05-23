# Player Manager - Web App

This repository is the front-end source built using `React` for the ***Player Manager*** API, a CodeIgniter project.

## Build Basics

**Node.js** version 8 and above is required.

All source files are contained in `/src/` and final `bundle.js` file get built to `/public/`.

Preview the files on a local server and perform development work by running `npm run dev` - this will start `webpack-dev-server` on `localhost:9001`

## Views

- Dashboard (localhost:9001) will show you already added players in the database.
- Clicking on individual players will show you more detail about the player.
  - On this view, you will be able to delete player from the database by clicking on `Delete` button.
- Upload Athlete will take you to a view where you can upload `json` file to add new players.
  - Validation has been done on different type of files, files uploaded with invalid data structure for players.

## JS Development

### Framework

ReactJS is used to built this project.

### Libraries

`jQuery`, `axios` have been used for some functionalities.

### Components

The application starts from `app.js`. All components are created to be reused.

## CSS Development

Sass is used as the main framework for CSS development.

`bootstrap-sass` has been used for basic styling.

## Formatting

JS is formatted during a pre-commit hook using **Prettier**. This automation removes the need for a debate about style, it works automatically and it emphasizes readability in the resulting code.
