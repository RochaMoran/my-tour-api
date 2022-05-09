import { Router } from 'express'
import { createUser, login, verifiedAccount } from '../../controllers/users.controllers'
import { validateRegister, validateVerifiedCode } from '../../validators/users'

const router = Router()

router.get('/', (_req, res) => {
    res.send("Fetching all users")
})

router.post('/register/', validateRegister, createUser)
router.post('/login/', validateRegister, login)
router.put('/verified/', validateVerifiedCode, verifiedAccount)

export default router