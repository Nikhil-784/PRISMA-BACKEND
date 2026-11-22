const cookieParser = require('cookie-parser')
const express = require('express')

require('dotenv').config()
const app = express()

//regular middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//cookie middleware
app.use(cookieParser())

const userRouter = require('./routes/userRoutes')

app.use('/api', userRouter)



app.get('/health', (req, res) =>{
    res.send("Hi from Nikhil's Room!")
})

app.get('/room', (req, res) => {
    res.send("Padh le bsdk")
})

app.use((err, req, res, next) => {
    console.error(err)
    res.status(err.status || 500).json({
        success: false,
        message: err.status ? err.message : 'Internal server error'
    })
})

app.listen(3000, () => {
    console.log('server is running on port 3000')
})
