## Endpoints

| Method   | URL           | Description                              | 
| -------- | --------------| ---------------------------------------- | 
| `GET`    | `/users`      | Retrieve all users (requires login token) |
| `POST`   | `/users`     | create a new user |
| `POST`   | `/users/login`     | for logging in (see required parameters in Usage section below) |
| `GET`    | `/users/:id`      | Retrieve a single user with the id |
| `POST`   | `/products`     | create a new product (requires login token) |
| `GET`    | `/products`      | Retrieve all products |
| `GET`    | `/products/:id`      | Retrieve a single product with the id |
| `GET`    | `/products/:category`      | Retrieve products by the category |
| `GET`    | `/orders`      | Retrieve all orders |
| `POST`   | `/orders`     | place a new order (requires login token) |
| `GET`    | `/users/:id/current-orders`      | Retrieve a current orders of a use with the id |
| `GET`    | `/users/:id/completed-orders`      | Retrieve a completed orders of a use with the id |


## Usage parameters

### POST /users
To create a new user, these parameters are required
```
{
  "firstName": "",
  "lastName": "",
  "password": ""
}
```
___

### POST /users/login
To login after creating user, these parameters are required
```
{
  "lastName": "",
  "password": ""
}
```
___

### POST /products
To create a new user, these parameters are required
```
{
  "name": "",
  "price": "",
  "category": ""
}
```
___

### POST /orders
To place an order, these parameters are required
```
{
	"product_id": "",
	"quantity": "",
	"user_id": ""
}
```
