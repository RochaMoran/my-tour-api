import express from 'express'
import apiRoutes from './routes/API/index'
import config from './config/index'
import logging from './config/logging'
import bodyparser from 'body-parser'
import './database'

// import express, { Router } from 'express' => ESModules
// const express = require('express) => CommonJs

const app = express()

//Middleware for transform req.body to json
app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }));

app.use('/api', apiRoutes)

app.listen(config.server.port, () => {
    logging.info('SERVER', `Server running on ${config.server.hostname}:${config.server.port}`)
})