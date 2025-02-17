import mongoose, { Schema, Document } from 'mongoose';

export type TransactionType = 'clothes' | 'food' | 'junk' | 'work' | 'other';

export interface Income extends Document {
    source: string;
    amount: number;
    date: Date;
}

const incomeSchema: Schema<Income> = new Schema({
    source: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
});

export interface Expense extends Document {
    source: string;
    amount: number;
    date: Date;
    type: TransactionType;
}

const expenseSchema: Schema<Expense> = new Schema({
    source: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    type: { type: String, required: true, enum: ['clothes', 'food', 'junk', 'work', 'other'] }
});

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    isVerified: boolean;
    left: number
    spent: number
    income: Income[];
    expense: Expense[];
}

const userSchema: Schema<User> = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, "Please enter a valid e-mail address"] },
    password: { type: String, required: true },
    verifyCode: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    left: { type: Number, default: 0 },
    spent: { type: Number, default: 0 },
    income: [incomeSchema],
    expense: [expenseSchema]
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', userSchema);

export default UserModel;