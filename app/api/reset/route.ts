import Connect from "@/lib/dbConenct";
import { Income } from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/model/User";


export async function POST(req: NextRequest){
    await Connect()
    const reqBody = await req.json()

    try {
        const {username} = reqBody

        const user = await UserModel.findOneAndUpdate({username}, {left: 0, spent: 0, expense : [], income: []}, {new: true})
        if (user?.left === 0) {
            return NextResponse.json({success:true, message: "Reset Successful"})
        } else{
            return NextResponse.json({success:false, message: "Error in reset"})
        }

    } catch (error) {
        return NextResponse.json({success:false,message: "Error in reset"})
    }
}