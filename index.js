const cookieParser = require('cookie-parser')
const express = require('express')

require('dotenv').config()
const app = express()

//regular middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//cookie middleware
app.use(cookieParser())


app.get('/health', (req, res) =>{
    res.send("Hi from Nikhil's Room!")
})

app.get('/room', (req, res) => {
    res.send("Padh le bsdk")
})

app.listen(3000, () => {
    console.log('server is running on port 3000')
})
