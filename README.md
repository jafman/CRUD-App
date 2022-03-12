# CRUD-App

Basic CRUD application using Node.js, Express.js, and PostgreSQL

## How to Setup Project

- run `npm install` to install all dependencies
- create `config.json` file in the `config` directory using `config.sample.json` file provided as guideline
- create `.env` file using `.sample.env` as a guideline
- run `npm run migrate` to create tables
- run `node server` to start server

## API ENDPOINTS

### 1. post /api/user (Create User)

```
Request

{
    "name": "Abu Dhabi",
    "email": "abu@gmail.com",
    "password": "Jy@awwwwwa1"
}

Response

{
    "name": "Abu Dhabi",
    "email": "abu@gmail.com"
}

```

### 2. get /api/user (Get User)

```
Request

{
    "email": "abu@gmail.com",
    "password": "Jy@awwwwwa1"
}

Response

{
    "id": 12,
    "name": "Abu Dhabi",
    "email": "abu@gmail.com",
    "createdAt": "2022-03-12T17:32:59.249Z"
}

```

### 3. patch /api/user/:id (Update User)

```
Request

{
    "name": "Abu Dhabi",
    "email": "abu@gmail.com",
    "password": "Jy@awwwwwa1"
}

Response

{
    "message": "User was updated successfully."
}

```

### 4. delete /api/user/:id (Delete User)

```
Request

{
    "name": "Abu Dhabi",
    "email": "abu@gmail.com",
    "password": "Jy@awwwwwa1"
}

Response

{
    "message": "User was deleted successfully!"
}

```
