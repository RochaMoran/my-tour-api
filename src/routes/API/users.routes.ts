import { Router } from 'express'
import { createUser, login, verifiedAccount, addSiteToFavorite, deleteSiteToFavorite } from '../../controllers/users.controllers'
import { validateRegister, validateVerifiedCode, validateLogin } from '../../validators/users'
import { oauthGoogle } from '../../controllers/google.controller'

const router = Router()

router.get('/', (_req, res) => {
    res.send("Fetching all users")
})

router.post('/register/', validateRegister, createUser)
router.post('/login/', validateLogin, login)
router.post('/google/', oauthGoogle)
router.put('/verified/', validateVerifiedCode, verifiedAccount)
router.put('/favorite/:id', addSiteToFavorite)
router.delete('/favorite/:id', deleteSiteToFavorite)

export default router