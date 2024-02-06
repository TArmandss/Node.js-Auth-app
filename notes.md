## Project description

After completing the registration form, which stores all users' credentials in a
MySQL database, users can successfully log in to their accounts.

## Project dependencies and libraries (npm install ...)

1. express - framework for node.js
2. mysql - DB
3. express-session - is a tool for handling user sessions in a web application.
4. uuid - A package that generates unique identifiers following a standardized
   format.
5. body-parser - When someone sends data to your server, this data can be in
   different formats, like JSON or regular form data. body-parser helps your
   server understand and work with that data.
6. ejs - EJS is a templating engine for JavaScript
7. nodemon - is a utility that monitors for changes in your Node.js application
   and automatically restarts the server when changes are detected.

## App.use() method

- we utilize app.use() method to specify static files,
- And apply all the middleware

## req.body

- For getting a data from a client side

## Why we need to destroy session ?

Security - Sessions often contain sensitive information about the user, such as
user IDs or authentication tokens. If a user logs out or if the session becomes
inactive, destroying the session ensures that this sensitive information is no
longer accessible. This helps mitigate the risk of unauthorized access or
session hijacking.

## What is middleware in node.js ?
