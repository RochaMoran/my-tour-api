import express from 'express'
import sitesRoutes from './routes/sites'
import config from './config/index'
import logging from './config/logging'
import './database'

// import express, { Router } from 'express' => ESModules
// const express = require('express) => CommonJs

const app = express()

//Middleware for transform req.body to json
app.use(express.json())

app.use('/api/sites', sitesRoutes)

app.listen(config.server.port, () => {
    logging.info('SERVER', `Server running on ${config.server.hostname}:${config.server.port}`)
})