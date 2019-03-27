# hacktivoverflow

### ReST API Documentation

##### Basic Url : /

### Answer Routes

List of routes answer:

| Route                 | HTTP   | Header | Description              | Request                      | Response                                                  | Errors                                                |
| --------------------- | ------ | ------ | ------------------------ | ---------------------------- | --------------------------------------------------------- | ----------------------------------------------------- |
| /answers              | GET    | none   | get all answers          | none                         | - status 200 - an array of answers                        | none                                                  |
| /answers              | POST   | none   | create a single asnwer   | content:String**(Required)** | - status 201 - an object of new answer                    | - status: 404 - error message according missing field |
|                       |        |        |                          |                              |                                                           | - status: 401 - No Need Login                         |
| /answers/:id          | GET    | token  | get a single answer      | none                         | - status 200 - an object of one answer                    | none                                                  |
| /answers/:id          | PUT    | token  | update a single answer   | content:String**(Required)** | - status 200 - an updated object of one product           | - status: 401 - No Need Login                         |
|                       |        |        |                          |                              |                                                           | - status: 404 - error message according missing field |
| /answers/:id          | DELETE | token  | delete a single product  | none                         | - status 200 - a deleted object of one product            | - status: 401 - No Need Login                         |
|                       |        |        |                          |                              |                                                           | - status: 401 - No Authorize to access                |
| /answers/:id/upvote   | POST   | token  | add upvote to question   | none                         | - status 200 - an answer with updated upvoted             | - status: 401 - No Need Login                         |
| /answers/:id/downvote | POST   | token  | add downvote to question | none                         | - status 200 - an object of answer with updated downvoted | - status: 401 - No Need Login                         |



### Answer Routes

List of routes answer:

| Route                   | HTTP   | Header                   | Description                             | Request                                                    | Response                                                    | Errors                                                |
| ----------------------- | ------ | ------------------------ | --------------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------- |
| /questions              | GET    | none                     | get all questions                       | none                                                       | - status 200 - an array of questions                        | none                                                  |
| /questions              | POST   | none                     | create a single question                | title:String**(Required)**, content:String**(Required)**   | - status 200 - an object of new question                    | - status: 401 - No Need Login                         |
| /questions/user         | GET    | token                    | get all questions belong to logged user | none                                                       | - status 200 - an array of questions object                 | - status: 401 - No Need Login                         |
| /questions/:id          | GET    | token                    | get a single question                   | none                                                       | - status 200 - an object of one question                    | none                                                  |
| /questions/:id          | PUT    | token and authorize user | update a single question                | title:String**(Required)**, content:String**(Required)**** | - status 200 - an updated object of one question            | - status: 401 - No Need Login                         |
|                         |        |                          |                                         |                                                            |                                                             | - status: 404 - error message according missing field |
| /questions/:id          | DELETE | token and authorize user | delete a single question                | none                                                       | - status 200 - a deleted object of one question             | - status: 401 - No Need Login                         |
|                         |        |                          |                                         |                                                            |                                                             | - status: 401 - No Authorize to access                |
| /questions/:id/upvote   | POST   | token                    | add upvote to question                  | none                                                       | - status 200 - an object of question with updated upvoted   | - status: 401 - No Need Login                         |
| /questions/:id/downvote | POST   | token                    | add downvote to question                | none                                                       | - status 200 - an object of question with updated downvoted | - status: 401 - No Need Login                         |





### Sign In & Sign Up Routes

List of routes sign-in sign-up:

| Route           | HTTP | Header(s) | Description                   | Request                                                      | Response                             | Error                                                 |
| --------------- | ---- | --------- | ----------------------------- | ------------------------------------------------------------ | ------------------------------------ | ----------------------------------------------------- |
| /users/signin   | POST | none      | Sign in user into application | username:String**(Required)**, password:String**(Required)** | - status 200 - token, fullname, role | - status: 404 - error message according missing field |
| /users/register | POST | none      | Sign up user for new account  | fullname:String**(Required)**, email:String**(Required**), username:String**(Required)**, password:String**(Required)**, | - status 200 - an object of new user | - status: 404 - error message according missing field |




