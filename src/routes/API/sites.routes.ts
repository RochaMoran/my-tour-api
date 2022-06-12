import { Router } from 'express'
import { createSite, getAllSites, getOneSite, getSitesByUser, searchSite, deleteSite, updateSite } from '../../controllers/sites.controllers'
import { authenticateToken } from '../../middleware/auth.token'
import { upload } from '../../middleware/upload.image'
import { createSiteValidate } from '../../validators/sites'

const router = Router()

router.get('/all/:page*?', getAllSites)

router.get('/:id', getOneSite)

router.get('/user/:user', getSitesByUser)

router.get('/search/:name', searchSite)

router.delete('/delete/:id', deleteSite)

router.put('/update/:id', [authenticateToken, upload.single('image'), ...createSiteValidate], updateSite)

router.post('/create/', [authenticateToken, upload.single('image'), ...createSiteValidate], createSite)

export default router