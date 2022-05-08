import { Router } from 'express'
import { createUser, login } from '../../controllers/users.controllers'
import { validateRegister } from '../../validators/users'

const router = Router()

router.get('/', (_req, res) => {
    res.send("Fetching all users")
})

router.post('/register/', validateRegister, createUser)
router.post('/login/', validateRegister, login)

export default router