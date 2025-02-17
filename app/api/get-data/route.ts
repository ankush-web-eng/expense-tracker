import Connect from "@/lib/dbConenct";
import { User, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";
import UserModel from "@/model/User";
import { revalidatePath } from "next/cache";

export async function GET(req : NextRequest) {
    await Connect();
    const session = await getServerSession(authOptions);
    const _user: User = session?.user;
    try {

        if (!session || !_user) {
            return Response.json(
                { success: false, message: 'Not authenticated' },
                { status: 401 }
            );
        }

        const userId = new mongoose.Types.ObjectId(_user._id);
        const user = await UserModel.findById(userId);

        const data = {
            left: user?.left,
            spent: user?.spent,
        }

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" });
        }

        const path = req.nextUrl.searchParams.get('path') || "/dashboard";
        revalidatePath(path);

        return NextResponse.json({ success: true, message: data });

    } catch (error) {
        return NextResponse.json({ success: false, message: "Couldn't Fetch Data!!" });
    }
}