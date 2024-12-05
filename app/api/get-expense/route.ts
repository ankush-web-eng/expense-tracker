import Connect from '@/lib/dbConenct';
import UserModel from '@/model/User';
import mongoose from 'mongoose';
import { User } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  await Connect();
  const session = await getServerSession(authOptions);
  const _user: User = session?.user;

  if (!session || !_user) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(_user._id);

  try {
    const user = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: '$expense' },
      { $sort: { 'expense.date': -1 } },
      {
        $group: {
          _id: '$_id',
          expense: { $push: '$expense' },
        },
      },
    ]).exec();

    if (!user || user.length === 0) {
      return Response.json(
        { message: 'User not found', success: false },
        { status: 404 }
      );
    }

    const path = request.nextUrl.searchParams.get('path') || "/expenses";
    revalidatePath(path);

    return Response.json(
      { message: user[0].expense },
      { status: 200 }
    );
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return Response.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}
