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
            racesWon: 0
        }
    )
    await user.save()
    res.send(user)
    console.log('New User Created!')
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
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
    let decode = await jwt.verify(token, secretKey);
    console.log(decode)
    console.log(decode.username) 
})

module.exports = router