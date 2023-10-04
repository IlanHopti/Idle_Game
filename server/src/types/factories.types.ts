import { Double, ObjectId } from "mongodb";

export interface Factories{
    user_id:ObjectId,
    level:Double,
    cost:Double,
    production:Double,
    type:string,
}
