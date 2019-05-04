# graphql-test-server

## Description

This project used `MongoDB`, `Mongo Express`, `Loopback`, `Apollo Graphql` to demonstrate a hotel reservations system. Which include

- create a reservation
- retrieve all reservation with pagination (by offset and limit)
- retrieve all reservation count
- retrieve a reservation by id

There are following features included.

- [x] Used `Loopback v3` as the API Framework
- [x] Restful endpoints (http://localhost:3000/explorer)
- [x] Graphql endpoints (http://localhost:3000/graphql)
- [x] Mongo Express to explore and mange date (http://localhost:8081)
- [x] Use `.graphql` file to build types with `merge-graphql-schemas`
- [x] Use `nodemon` to watch and auto restart dev server
- [x] Test REST APIs and GraphQL endpoints with `jest`

## Insteallation

### Requirement

- Docker
- Node v10
- yarn(npm)

### Start Dev Env

Locate to the root of the project foder.

1. `yarn run start:docker` start the depencencies (Mongo + MongoExpress).
2. `yarn`/`npm insteall` install the package modules.
3. `yarn start:dev` start the server on local(development) environment.

#### Optional Scripts

- `yarn run test` execute test with jest
- `yarn run test:watch` execute test in watch mode.
- `yarn run test:coverage` execute coverate test.

#### Test Restule

```s
yarn run v1.13.0
$ NODE_ENV=test jest --coverage
 PASS  test/base.test.js
 PASS  test/reservations.test.js
---------------------------|----------|----------|----------|----------|-------------------|
File                       |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
---------------------------|----------|----------|----------|----------|-------------------|
All files                  |    84.72 |    79.17 |    27.08 |    86.96 |                   |
 server                    |    57.14 |    71.43 |     9.09 |    63.16 |                   |
  config.test.js           |      100 |      100 |        0 |      100 |                   |
  server.js                |       50 |    33.33 |    14.29 |    56.25 |... 19,20,21,22,23 |
 server/boot               |    86.67 |      100 |    18.18 |    86.67 |                   |
  graphql.js               |    77.78 |      100 |    16.67 |    77.78 |             19,20 |
  root.js                  |      100 |      100 |       20 |      100 |                   |
 server/models             |      100 |      100 |    38.46 |      100 |                   |
  reservations.js          |      100 |      100 |       20 |      100 |                   |
  reservations.resolver.js |      100 |      100 |       50 |      100 |                   |
 server/utils              |      100 |       80 |    38.46 |      100 |                   |
  graphql-helper.js        |      100 |      100 |    33.33 |      100 |                   |
  lb-helper.js             |      100 |       80 |    42.86 |      100 |                16 |
---------------------------|----------|----------|----------|----------|-------------------|

Test Suites: 2 passed, 2 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        3.693s, estimated 4s
Ran all test suites.
✨  Done in 4.90s.
```

## Structure

```bash
.
├── README.md
├── data                             # The data folder, used to save data for this project
│   └── mongo                        # The mongo DB data folder mapped folder.(delete this folder to flush DB)
├── docker                           # Dev dependencies folder
│   └── docker-compose.yml           # Dev dependencies docker compose files
├── nodemon.json                     # nodemon config file
├── package.json
├── server
│   ├── boot
│   │   ├── graphql.js               # Regist Apollo Graphql to the server
│   │   └── root.js
│   ├── component-config.json
│   ├── config.development.js        # Development config
│   ├── config.json
│   ├── datasources.json             # DB connection file
│   ├── middleware.development.json
│   ├── middleware.json
│   ├── model-config.json            # Loopback model config file
│   ├── models                       # Loopback model folder
│   │   ├── reservations.graphql     # Reservation graphQL type file.
│   │   ├── reservations.js          # Reservation model file.
│   │   ├── reservations.json        # Reservation model config file.
│   │   └── reservations.resolver.js # Reservation graphQL resolver file.
│   ├── server.js                    # Loppback Model server main file
│   └── utils                        # Utils folder
│       ├── graphql-helper.js        # Graphql helper file
│       └── lb-helper.js             # Loopback helper file
├── test
│   └── base.test.js
└── yarn.lock

```

## Test GraphQL

### Create a reservation

```graphql
mutation($data: ReservationInput!) {
  createReservation(data: $data) {
    id
    guestName
    hotelName
    arrivalAt
    departureAt
  }
}

# variables
{
  "data": {
    "guestName": "Oliver",
    "hotelName": "Shanghai",
    "arrivalAt": "2019-04-29T17:14:24.393Z",
    "departureAt":"2019-05-29T17:14:24.393Z"
  }
}
```

### Fetch all reservations

```graphql
query ($query: QueryInput){
  totalReservations
  reservations(query: $query){
      id
      guestName
      hotelName
      arrivalAt
    }
}

# variables
{
  "query": {"limit": 10, "skip":0}
}
```

### Get a reservation with id

```graphql
query($id: ID!) {
  getReservation(id: $id) {
    id
    guestName
    hotelName
    arrivalAt
    departureAt
  }
}

# variables
{
  "id": "5cc5e6189480d400988a2b76"
}

```
