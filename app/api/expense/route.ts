import Connect from "@/lib/dbConenct";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import { Expense } from "@/model/User";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {

    await Connect();
    const reqBody = await req.json();

    try {
        const { source, amount, email } = reqBody;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" });
        }

        const expense = user.spent;
        const totolExpense = expense + amount;

        user.spent = totolExpense;
        user.expense.push({ source, amount, date: new Date() } as Expense);
        await user.save();

        const path = req.nextUrl.searchParams.get('path') || "expenses";
        revalidatePath(path);

        return NextResponse.json({ success: true, message: "Expense Saved Successfully" });

    } catch (error) {
        return NextResponse.json({ success: false, message: "An Error occured while Saving the Expense. Please try again later." });
    }
}