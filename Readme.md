# Fullstack series
I study fullstack through a project Expense Tracker. And i will share it for everyone. I hope that it is useful for you.
## Phase 2: Express REST API becomes the interface
we will not touch mogoDB or React yet
in this program, i keep phase 1 business logic and json storage
before writing code, these are the concepts we should understand
### 1. About express framework
- express is a backend web framework for node.js 
- Node.js can already create an HTTP server, but doing everything manually is inconvenient. Express provides an abstraction for routing, request, response, middleware, etc.
- Mental model: javascript = language, Node.js = run the js on the server, express = framework for building web server or api with node.js
### 2. What is an API? 
- API (application programming interface) is an interface that allows two pieces of software to communicate.
- This project work like: React frontend -`(API request)`-> Express backend --> MongoDB 
- The frontend doesn't need to know `how` the backend obtains that data
### 3. What is REST API
- REST is an architectural style for designing APIs around resources.
- In my application, one resource is `transaction`, so instead of endpoints like: 
`/getTransactions`
`/createTransaction`
`/deleteTransaction`
-> REST commonly uses: 
`GET /api/transactions`
`POST /api/transactions`
`GET /api/transactions/5`
`DELETE /api/transactions/5`

- note: the HTTP method describes the action, while the URL describes the resource
  | HTTP        | Meaning |
  | :---------- | ------: |
  | `GET`       |    Read | Create -> POST
  | `POST`      |  Create | Read   -> GET
  | `PUT/PATCH` |  Update | Update -> PUT/PATCH
  | `Delete`    |  Delete | Delete -> DELETE

***How does an API request work?***
- This is one of the most important mental models in fullstack engineer (fundamental)
- The flow is: 
React --`API`-> Express --> Route --> Controller --> Service --> Repository --> Database
- Then the result travels back:
Data <-- Repository <-- Service <-- **Controller** --`HTTP response`-> React

### 4. `res` and `req` in Express
- when you write: `app.get("/api/transactions/:id", (req, res) => {});`
- Expres will give you two important objects:
    - `req` = request form client
    - `res` = response you send back
- Note: the response is not only JSON file, it also communicates whether the operation succeeded:
   -`200 OK`
   - `201 Created`
   - `400 Bad req`
   - `401 unauthorized`
   - `403 Forbidden`
   - `404 Not found`
   - `500 Internal server Error`
### 5. In this program
- The new flow is: HTTP request --> Route --> Controller --> Service --> Repository --> Data(transaction.json)
- i will separation `app.js` to configure application and `index.js` to start HTTP server. this action will make tesing easier later.
- `CRUD` properly is: Create, Read, Update, Delete
### 6. What is a unit test
- it suppose we want to test function / feature / ... i don't want to use the real json file
- so i replace the repository with a mock repository -> this isolates the service
- API integration test: Multiple backend  layers working together | POST -> middleware -> controller -> service -> response
- Manual API test: you interact with API yourself |  Postman, Bruno, Thunder
### 7. What are OpenAPI and Swagger
- OpenAPI is a standard format for describing a REST API
- It defines thing like: endpoint, HTTP method, parameters, request body, respone, status code
- Swagger UI reads that OpenAPI description and give you an interactive documentation page where you can inspect and test endpoint
- You can understand: OpenAPI is API description format while Swagger UI is visual documentation or testing interface
- OpenAPI can be written YAML or  JSON file. YAML is just a human readable data format based on indentation. 
- Example: 
### Example script
```YAML
/api/transactions:
  get:
    summary: Get all transactions
    responses:
      200:
        description: Success
```
- Express route -> JSDoc annotation to describe route -> swagger-jsdoc creates openapi json -> swageer UI to display and allow "Try it out"

