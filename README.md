# Bank-API-Backend

I have created a backend server for a bank API using express.

I have used Postman for the endpoints.

### Users info:

I have a json data with users , each user has : ID , Name , Cash and Credit.

---

## Link:

Backend Link : https://bank-api-backend.onrender.com/

---

# What can you do in this server & How?

- You can get all of the users info.

```json
( /api/v1/bank )
```

- You can get a specific user info by typing his ID.

```json
(/api/v1/bank/[id of the user])
```

- You can search by name / letter to get users info.

```json
(/api/v1/bank/users/name?search=[letter/name of the user/users])
```

- You can get all of the users who has lower/equal amount of cash in the bank.

```json
(api/v1/bank/users/lower-than?cash=[x amount])
```

- You can get all of the users who has higher/equal amount of cash in the bank.

```json
(api/v1/bank/users/higher-than?cash=[x amount])
```

- You can create a new user.
- You can delete a user.

- You can deposit cash to a specific user.
- You can update credits of a specific user.

- A user can withdraw money from his bank account.
- A user can transfer money from his bank account to someone else's bank account.

---
