import { Factories } from "@/types/factories.types";
import { db } from "../mongo"

export const Factory = db!.collection<Factories>('factories')