# Player Manager - API

This repository is the back-end source built using `CodeIgniter` PHP framework for the ***Player Manager*** Web Application, React project.

## Basic Setup

In order to get started, I have attached database file for you to import. [Database File](../player_manager.sql). I have also attached dummy `json` file to upload once your start `React` app. [Database File](../players.json)

## API Endpoints

### /backend/api/players (GET method)

This will give you all the players from the database.

### /backend/api/players/{id} (GET method)

This API endpoint is helpful to get details about specific player only by adding `id` at the end.

### /backend/api/players/upload (POST method)

Thi API endpoint is useful to upload `json` file and add new players in bulk. Below are certain requirements for the file to upload.

```json
{
   "Players":[
      {
         "Name":"string",
         "Age":"int",
         "Location":{
            "City":"string",
            "Province":"string",
            "Country":"string"
         }
      }
   ]
}
```

Only `json` files are allowed to upload. API has validation in place to throw an error if the provided data is not organized as above.

### /backend/api/players (DELETE method)

This will delete all the players from the database.

### /backend/api/players/{id} (DELETE method)

This API endpoint is helpful to delete specific player only by adding `id` at the end.

### /backend/api/players (POST method)

This endpoint is helpful to submit `json` data instead of a file by submitting form. It'll still expect data in the same format as above or else it'll thrown an error.

Here is the required format.

```json
{
   "Players":[
      {
         "Name":"string",
         "Age":"int",
         "Location":{
            "City":"string",
            "Province":"string",
            "Country":"string"
         }
      }
   ]
}
```
