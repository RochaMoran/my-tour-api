import { Router } from 'express'
import { createUser } from '../../controllers/users.controllers'
import { validateRegister } from '../../validators/users'

const router = Router()

router.get('/', (_req, res) => {
    res.send("Fetching all users")
})

router.post('/register/', validateRegister, createUser)

export default router