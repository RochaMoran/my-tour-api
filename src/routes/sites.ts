import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
    res.send("Fetching all sites")
})

router.post('/', (_req, res) => {
    res.send("Saving a site")
})

export default router