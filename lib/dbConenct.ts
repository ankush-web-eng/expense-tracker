import mongoose from "mongoose";

type ConnectionObject = {
    isConencted?: number;
}

const connection : ConnectionObject = {}

export default async function Connect() {
    if(connection.isConencted) {
        return;
    }
    try {
        const uri = process.env.MONGO_URI || '';
        const db = await mongoose.connect(uri, {});

        connection.isConencted = db.connections[0].readyState;

        console.log('Connected to database');
    } catch (error) {
        console.log('Error connecting to database');
        console.log(error);
    }
}
