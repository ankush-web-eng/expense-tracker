import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    netincome : number
    netexpense : number
    income: Income[];   
    expense: Expense[];
}

export interface Income extends Document{
    source : string;
    amount: number;
    date: Date;
}

export interface Expense extends Document{
    category: string;
    source: string;
    amount: number;
    date: Date;
}