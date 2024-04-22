import {z} from 'zod'

export const incomeSchema = z.object({
    source: z.string().min(2, 'Income source must be at least 2 characters'),
    amount: z.number().min(1, 'Income amount must be at least 1'),
    date: z.date()
})