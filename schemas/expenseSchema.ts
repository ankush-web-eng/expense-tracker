import {z} from 'zod'

export const expenseSchema = z.object({
    category: z.string().min(2, 'Expense category must be at least 2 characters'),
    amount: z.number().min(1, 'Expense amount must be at least 1'),
    date: z.date()
})