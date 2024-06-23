const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const uri = "mongodb+srv://easy317:football12345@sharktyper.youhd87.mongodb.net/sharktypers"
const jwt = require('jsonwebtoken')

const User = require('../models/UserModel')
const secretKey = 't0asd44-de-swe35f-df34-DzfXfdsFdDR-411203sq-azZCsd36XDe43'

mongoose.connect(uri)

router.use(express.json())

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body
    const user = new User(
        {
            username: username,
            password: password,
            email: email,
            level: 1,
            exp: 0,
            scales: 0,
            racesCompleted: 0,
            racesWon: 0
        }
    )
    await user.save()
    res.send(user)
    console.log('New User Created!')
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    console.log(username+' theusername')
    console.log(password+' thepassword')
    const userId = await User.findOne({ username: username })
    if (!userId) {
        return res.status(401).json({ message: 'No username found' });
    }

    if (password != userId.password) {
        return res.status(401).json({ message: 'Invalid Password' });
    }

    token = jwt.sign({ username: userId.username, email: userId.email, level: userId.level }, secretKey);
    res.status(200).json({ token, message: 'Login successful' });

    console.log('User Logged In!')
    console.log(token)
})

router.post('/', async (req, res) => {
    const username = req.body.username
    const updatedEXP = req.body.updatedEXP
    try {
    const userId = await User.findOne({ username: username })
    if (!userId) {
        return res.status(401).json({ message: 'No username found' });
    }

    await User.updateOne({ username: username }, { exp: userId.exp + updatedEXP, scales: userId.scales + 100, racesCompleted: userId.racesCompleted + 1 });
    res.status(200).json({ message: 'Data Save Successful' });

    } catch (err) {
        console.error(err);
    }
})

router.get('/protected', verifyToken, (req, res) =>{

    res.json({ user: req.authData.username })
})

// Function to verify JWT token
function verifyToken(req, res, next) {
    console.log('i ran')
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const token = bearer[1];
      // Verify token
      jwt.verify(token, secretKey, (err, authData) => {
        if (err) {
          res.sendStatus(403); // Forbidden
        } else {
          // Token is valid
          req.authData = authData; // Attach authData to request object if needed
          next(); // Proceed to next middleware or route handler
        }
      });
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  }

module.exports = router