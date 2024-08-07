import { connect, set } from "mongoose";
import { validateEnv } from '../config/config';


export const mongooseLoader = async () => {

    const MONGO_DB_CONNECTION =
        validateEnv().databaseUrl || "mongodb+srv://shareadmin:w09sAJc5R9V52M8f@cluster0.wvrwkuo.mongodb.net/";
    try {
        set("strictQuery", false);
        const db = await connect(MONGO_DB_CONNECTION);
        console.log("MongoDB connected to", db.connection.name);
    } catch (error) {
        console.error(error);
    }
}


