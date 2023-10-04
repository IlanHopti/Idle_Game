import { Factory } from "@/db/models/Factories";
import { ObjectId } from "mongodb";
// import { WithId } from "mongodb";

export async function getFactories() {
    try {
        const factories = await Factory.find().toArray();
        return factories;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getFactoriesByUser(user:string) {
    try {
        const factory = await Factory.findOne({ user_id: new ObjectId(user) });
        return factory;
    } catch (error) {
        console.error(error);
        throw error;
    }
}