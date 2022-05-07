import { Router } from 'express'
import { createSite } from '../../controllers/sites.controllers'

const router = Router()

router.get('/', (_req, res) => {
    res.send("Fetching all sites")
})

router.post('/create/', createSite)

export default router