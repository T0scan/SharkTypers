const express = require('express')
const app = express()

const userRoute = require('./routes/User')

app.use('/api/user', userRoute)

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server listening on PORT: '+PORT)
})