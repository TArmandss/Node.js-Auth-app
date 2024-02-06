const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const PORT = process.env.PORT || 3001;

app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true
    })
);

app.use('/static', express.static(path.join(__dirname, 'public'))); // in order to access css file
app.use('/video', express.static(path.join(__dirname, 'public/assets/video'))); // in order to access video

app.use(express.urlencoded({ extended: false })); // is for data that we get from the form

app.set('view engine', 'ejs'); // Set EJS as the template engine

app.get('/', function (req, res) {
    //creating a route
    res.render('main.ejs', { title: null });
});

// DATABASE CONNECTION SECTION ------------------------------------------------------------------------------

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users_nodejs'
});

// db.connect(err => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//         return;
//     }
//     console.log('Connected to MySQL');
// });

const dbQuery = (username, password, new_username, new_password, res) => {
    const sql = 'SELECT * FROM user';
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        }

        if (username && password) {
            const userExists = data.some(
                user => user.login === username && user.password === password
            );

            if (userExists) {
                res.render('login.ejs');
            } else {
                const isIncorrect = true; // Set this based on your condition

                res.render('main.ejs', { title: 'Incorrect user credentials', isIncorrect });
            }
        } else if (new_username) {
            const userDoesNotExist = data.every(user => user.login !== new_username);

            if (userDoesNotExist) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailRegex.test(new_username)) {
                    return res.render('registerForm.ejs', {
                        message: 'Please enter a valid email address.'
                    });
                } else {
                    const sql = 'INSERT INTO user (login, password) VALUES (?, ?)';
                    db.query(sql, [new_username, new_password], (err, result) => {
                        if (err) {
                            console.error('Error inserting into MySQL:', err);
                        } else {
                            console.log('Data inserted successfully!');
                        }
                    });
                    res.redirect('/');
                }
            } else {
                res.render('registerForm.ejs', {
                    message: 'This username is already taken'
                });
            }
        } else {
            res.send('Invalid request parameters');
        }
    });
};

// DATABASE CONNECTION SECTION ------------------------------------------------------------------------------

app.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    dbQuery(username, password, null, null, res);
});

app.get('/logout', (req, res) => {
    // Destroy the session to log the user out
    req.session.destroy(err => {
        if (err) {
            res.send('Error logging out');
        } else {
            res.render('main.ejs', { title: null, isIncorrect: null });
        }
    });
});

app.get('/register', (req, res) => {
    res.render('registerForm.ejs', { message: null });
});

app.post('/register', (req, res) => {
    const { new_username, new_password } = req.body;

    dbQuery(null, null, new_username, new_password, res);
});

app.listen(PORT, () => {
    console.log('Is listenting on port http://localhost:3001');
});
