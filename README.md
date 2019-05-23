# Player Manager - Web App

This repository is the for an back-end and front-end sources for **Player Manager** application. This includes [API backend](/backend) built using `CodeIgniter 3` and front-end [web app](/frontend) built using `React JS`

Individual project `README.MD` files are inside specific folders with more details on implementation and other useful information. This `README` will guide you to setup this project locally.

## Getting Started

- To clone this repo: `git clone git@github.com:dhavalwd/player_manager.git`
- I have used `XAMPP` to setup this project. You can move this repo inside `htdocs` once you clone it. `XAMPP` version `7.3.5 / PHP 7.3.5` for Mac.
- This repo contains `player_manager.sql` file which you can import using `phpmyadmin`. Database name is `player_manager`
- Once you import the database
  - Open terminal and go to `/frontend` folder
  - Run `npm install`
  - then run `npm run dev` command.
- This should start `webpack-dev-server` on `9001` port. URL: http://localhost:9001

## Backend

CodeIgniter API is inside `/backend` folder. Link mentioned above. Once you follow above steps and properly connect database, you should be able to hit below API endpoints.

- http://localhost/player-manager/backend/api/players (GET)
- http://localhost/player-manager/backend/api/players (POST)
- http://localhost/player-manager/backend/api/players (DELETE)
- http://localhost/player-manager/backend/api/players_upload (POST)

### Backend Validation

Backend validation is in place for all endpoints. Below are the situations when API will throw an error for `players_upload` endpoint.

- Not a `json` file
- Not a valid `json` data
- Not expected `json` object structure
- If no file is uploaded

## Frontend

Once you install all dependencies and start the server, you should be able to hit [http://localhost:9001](http://localhost:9001).

### Frontend Validation

Validation is in place for Front end app. For **Upload Athlete** page, user is only allowed to select `*.json` files. App will throw an error in below situations.

- Not a `json` file
- Invalid `json` data
- Not expected `json` object structure
- If no file is uploaded on submit

## For Testing

Note: I have used `postman` to test `API` endpoints. Here is the link for [Postman Collection](https://www.getpostman.com/collections/9904727377b2f6f79b5b)

Note: I have attached dummy `json` file for you to upload. [Json file](/players.json)
