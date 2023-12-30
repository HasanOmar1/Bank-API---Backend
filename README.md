# Bank-API-Backend

I have created a backend server for a bank API using express.

I have used Postman for the endpoints with a port of 9999.

### Users info:

I have json data with users , each user has :

- auto generated ID [used uuid package]
- Name
- Cash
- Credit
- isActive

---

## Link:

Backend Link : https://bank-api-backend.onrender.com/

---

# What can you do in this server & How?

- You can get all of the users info.

```json
( /api/v1/bank )
```

- You can get all of the active users info.

```json
( /api/v1/bank/active-users/true )
```

- You can get all of the inActive users info.

```json
( /api/v1/bank/active-users/false )
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

- You can get all of the active users who has lower/equal amount of cash in the bank.

```json
(api/v1/bank/active-users/lower-than?cash=[x amount])
```

- You can get all of active users who has higher/equal amount of cash in the bank.

```json
(api/v1/bank/active-users/higher-than?cash=[x amount])
```

- You can create a new user.
- You can delete a user.

- You can deposit cash to a specific user.
- You can update the credit of a specific user.

- A user can withdraw money from his bank account.
- A user can transfer money from his bank account to someone else's bank account.

---

## Things to know:

- When a user withdraws money from his account , first he will withdraw from his cash and if he doesn't have anymore cash
  he will withdraw from his credit.

- When a user transfers money from his bank account to another user , he will transfer using cash and if he doesn't have cash anymore he will transfer his credit , and the other user will always get the money as credit and not as cash.

---

## How to:

I have mentioned above how to GET users info , in this section i will be putting the URLs for the other endpoints.
You can try these endpoints in Postman like i did.

- Create a user: api/v1/bank then put the user info in the body. [name , cash , credit]
- Delete a user: /api/v1/bank/ [user id]
- Deposit cash to a user: /api/v1/bank/deposit/ [user id] ?cash=[amount of cash]
- Update credits of a user: /api/v1/bank/ [user id] ?credit=[amount of credit]
- Withdraw money : /api/v1/bank/withdraw/ [user id] ?money=[amount of money]
- Transfer money: /api/v1/bank/transfer/from/ [sender id] /to/ [recipient id] ?money=[amount of money]
