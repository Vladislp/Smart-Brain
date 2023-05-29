import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Database placeholder for users
const database = {
    /* 
       We'll have 'entries', wh ich is what we're going to use to track scores so entries means 
       how many times John has submitted photos for face detection 
    */
    users: [
        {
            id: '123',
            name: 'John',
            password: 'cookies',
            email: 'john@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            password: 'bananas',
            email: 'Sally@gmail.com',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com',
        }
    ]
}

// Route for retrieving all users
app.get('/', (req, res) => {
    res.send(database.users);
})

// Route for user sign-in

/*
    We want to check whatever the user enters on the front-end – 
    it's going to come back here in the response
    or in the request and we want to check it with our current list of users to make sure that their 
    passwords match.
*/
app.post('/signin', (req, res) => {
    // Load hash from your password DB.
    /*
    bcrypt.compare("apples", '$2b$10$2gxIU2tdSR.XefHz2ydXIe6gnWA8MKBihOrgCuxKhZybeMoehELw.', function(err, result) {
        console.log('first guess', res)
    });
    bcrypt.compare("veggies", '$2b$10$2gxIU2tdSR.XefHz2ydXIe6gnWA8MKBihOrgCuxKhZybeMoehELw.', function(err, result) {
        console.log('second guess', res)
    });
    */
    console.log(req.body)
    console.log(req.body.email === database.users[0].email)
    console.log(req.body.password === database.users[0].password)
    console.log(req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password)
    // Compare the entered email and password with the existing user's credentials
    if(req.body.email === database.users[0].email && 
       req.body.password === database.users[0].password) {
        console.log("wtf")
        res.status(200).json('success');
    } else {
        res.status(400).json('error logging in')
    }
});

// Route for user registration
app.post('/register', (req, res) => {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            console.log(hash)
        });
    });
    const {email, name, password} = req.body;
    // Add the new user to the database
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
            return res.json(user);
        } 
    })
    if (!found) {
        res.status(400).json('not found');
    }
});


const saltRounds = 10;

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries);
        } 
    })
    if (!found) {
        res.status(400).json('not found');
    }
});

// Start the server
app.listen(3001, () => {
    console.log('app is running on port 3001')
})
