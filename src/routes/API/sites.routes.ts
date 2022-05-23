import { Router } from 'express'
import { createSite, getAllSites, getOneSite } from '../../controllers/sites.controllers'
import { authenticateToken } from '../../middleware/auth.token'
import { upload } from '../../middleware/upload.image'
import { createSiteValidate } from '../../validators/sites'

const router = Router()

router.get('/', getAllSites)

router.get('/:id', getOneSite)

router.post('/create/', [authenticateToken, upload.single('image'), ...createSiteValidate], createSite)

export default router