# Recipest: Recipe API

You have a database ready in a docker image, with necessary schema and a script to seed the data.
Your goal is to implement a HTTP server with a single EP to return JSON data for the feature described bellow.


## Setup

### Database
Start the database
```sh
$ cd docker-compose
$ docker-compose up
```
This will create and start the database and prepare the schema. 
You can read the connection details in `./docker-compose/docker-compose.yml`.

### Database data

```sh
$ npm ci
$ npm run seed-data
STARTING..................................................DONE
```

Inspect the database now, we have `users`, that created some `recipes`. Users can also rate the `recipes` using `reviews` and each review has a rating.

![](https://www.plantuml.com/plantuml/png/SoWkIImgAStDuIhEpimhI2nAp5L8IapEJY_AByrBISxFoIzIA2bAp2i6IgNcbN3b9sMb9fSeX1Qd5i7OGQd9cGMf25vPPcev5qY1WcurL1BA1VAXqX1AGHScxv2Qbm9q1000)

## Task

Implement a HTTP server that returns newest popular recipes.

 1. `http://localhost:3000/api/popular-recipes` must return a valid JSON response with array of recipes, see example response
 2. Select only receipts with an average rating higher than `8`
 3. Order results by `publish_time`. If it is null, use `create_time` instead, newest first
 4. Return first 20 items only

Example response:
```json
[{
    "id": "42",
    "name": "The Tasty Yellowstripe scad with lavender eyeballs",
    "mainIngredient": "fish",
    "publishTime": "2022-04-13T12:40:27.682Z",
    "averageRating": 8.5
}]
```

### Nice to have

We found out that reviews from people who have at least once reviewed a meal with main ingredient _fish_ are more relevant. Exclude from calculation reviews from users that have not reviewed fish at least once.

## Tips

 - Task is very minimal due to limited time. Try to put as much effort as you worked on production code the way you are used to (clean Git history, tests and any tools and processes etc.)
 - If you get stuck for 15-20 minutes, feel free to reach and consult your buddy
 - The libraries used are completely up to you. If you are in doubt discuss with your buddy. But do use Node.js
 - Don't mind the code and dependencies used in existing files
