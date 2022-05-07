import express from 'express'
const app = express()

//Middleware for transform req.body to json
app.use(express.json())

const PORT = 5500;

app.get('/ping', (_req, res) => {
    console.log('Someone pinged here!!')
    res.send('pong')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})