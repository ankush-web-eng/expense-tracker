import Connect from "@/lib/dbConenct";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import { Income } from "@/model/User";

export async function POST(req: NextRequest) {

    await Connect()
    const reqBody = await req.json()

    try {
        const { source, amount, username } = reqBody

        const user = await UserModel.findOne({username})
        if (!user) {
            return NextResponse.json({success: false, message: "User not found"})
        }

        user.income.push({source, amount, date: new Date()} as Income)
        await user.save()

        return NextResponse.json({success: true, message: "Expense Saved Successfully"})

    } catch (error) {
        return NextResponse.json({success: false, message: "An Error occured while Saving the Expense. Please try again later."})
    }
}