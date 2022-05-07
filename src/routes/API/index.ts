import express from 'express'
import sitesRoutes from './sites.routes'

const app = express()

app.use('/sites', sitesRoutes);

export default app;