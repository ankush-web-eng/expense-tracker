import {z} from 'zod'
import { usernameValidation } from './signUpSchema'

export const incomeSchema = z.object({
    username : z.string(),
    source: z.string().min(2, 'Income source must be at least 2 characters'),
    amount: z.number().min(1, 'Income amount must be at least 1'),
    date: z.date()
})