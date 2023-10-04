import { ObjectId } from "mongodb"

export interface AuthRegisterBody {
    username: string
    password: string
}

export interface User {
    _id?: ObjectId
    username: string
    password: string
    token: string
    createdAt: Date
    money?: number
    ressources?: UserRessources
}

export interface SimpleUser {
    username: string
    createdAt: Date
}

export interface UserRessources {
    wood: number;
    coal: number;
    stone: number;
    iron: number;
    gold: number;
    diamond: number;
    [key: string]: number; // Ajouter cette signature d'index
}