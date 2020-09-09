# CloudWalk Software Engineer - Test

This project has the purpose of test my developer skills and of course show to CloudWalk what can I do and **how** (the most important) I do this tasks.

## [Developer] - Explaining the project structure

If you like to know how I did the project structure and a little of my thoughts, see: [Explaining project structure](Explaining-project.md)

## How to use the API

The API has just one route, that is a **GET /**. But, you can pass up to two parameters to get more details about the report. Here are the possible requests that you can do:

- Without parameters:
  > **GET** localhost:3000/

  ```json
  {
    "total_kills": 29,
    "players": [
        "Oootsimo",
        "Zeh",
        "Isgalamido",
        "UnnamedPlayer",
        "Dono",
        "Bola",
        "Maluquinho",
        "Assasinu",
        "killed",
        "Mal"
    ],
    "kills": {
        "Oootsimo": 8,
        "Isgalamido": 3,
        "Zeh": 7,
        "Dono": 2,
        "Maluquinho": 0,
        "Assasinu": 1
    }
  }
  ```

- With ranking:
  > **GET** localhost:3000/?ranking=true

  ```json
  {
    "ranking": {
        "Isgalamido": 159,
        "Zeh": 132,
        "Assasinu": 120,
        "Oootsimo": 119,
        "Dono": 78,
        "Chessus": 34,
        "Mal": 21,
        "Maluquinho": 0
    }
  }
  ```

- With death cause:
  > **GET** localhost:3000/?death_cause=true

  ```json
  {
    "total_kills": 105,
    "players": [
        "Isgalamido",
        "Dono",
        "Bola",
        "Zeh",
        "Assasinu",
        "killed"
    ],
    "kills": {
        "Dono": 14,
        "Isgalamido": 21,
        "Zeh": 20,
        "Assasinu": 14
    },
    "deathCauses": {
        "MOD_TRIGGER_HURT": 5,
        "Bola": 23,
        "MOD_FALLING": 5,
        "Zeh": 6,
        "MOD_RAILGUN": 4,
        "MOD_ROCKET": 1,
        "MOD_ROCKET_SPLASH": 11,
        "Isgalamido": 4,
        "by": 28,
        "MOD_MACHINEGUN": 2,
        "Dono": 4,
        "da": 4,
        "Assasinu": 6,
        "MOD_SHOTGUN": 1,
        "Credi": 1
    }
  }
  ```

## How run the tests

You can just run the command **npm test**.

## ENJOY! :)