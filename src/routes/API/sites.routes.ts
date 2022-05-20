import { Router } from 'express'
import { createSite } from '../../controllers/sites.controllers'
import { upload } from '../../middleware/upload.image'
import { createSiteValidate } from '../../validators/sites'

const router = Router()

router.get('/', (_req, res) => {
    res.send("Fetching all sites")
})

router.post('/create/', [upload.single('image'), ...createSiteValidate], createSite)

export default router