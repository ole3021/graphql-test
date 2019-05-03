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

## Structure

```bash
.
├── README.md
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
