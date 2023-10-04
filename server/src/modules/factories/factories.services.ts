import { Factory } from "@/db/models/Factories";
import { ObjectId } from "mongodb";
import { User } from "@/types/auth.types";
import { Users } from "@/db/models/User";
import { FactoryRessources } from "@/db/models/FactoriesRessources";

export async function getFactories() {
    try {
        const factories = await Factory.find().toArray();
        return factories;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getFactoriesByUser(user: string) {
    try {
        const factory = await Factory.findOne({ user_id: new ObjectId(user) });
        return factory;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function createFactory(user: string, type: string) {
    const newFactory = await Factory.insertOne({
        level: 1,
        cost: 100,
        production: 0.25,
        type: type,
        user_id: new ObjectId(user),
    })

    return newFactory;
}

export async function upgradeFactory(factory_id: string, user: User) {
    const factory = await Factory.findOne({ _id: new ObjectId(factory_id) });
    const requiredResources = await FactoryRessources?.findOne({ type: factory?.type })

    if (!factory || !requiredResources) {
        return { message: 'Factory not found' }
    }
    if (factory.level === 10) {
        return { message: "Your factory is max level" };
    }

    if (user._id != factory.user_id) {
        return { message: "This isnt your factory" };
    }
    const userResources = user.ressources;
    if (!userResources) {
        return { message: userResources }
    }
    const requiredLevelResources = requiredResources.ressources[factory.level];

    for (const resourceType in requiredLevelResources) {
        const requiredAmount = requiredLevelResources[resourceType];
        const userAmount = userResources[resourceType] || 0;

        if (resourceType !== 'money') {
            userResources[resourceType] -= requiredAmount;
            if (userAmount < requiredAmount) {
                return { message: `Insufficient ${resourceType} to upgrade the factory` };
            }
        }
    }

    if (!user.money || user.money && user.money < requiredResources.ressources[factory.level].money) {
        return { message: "You dont have enough money to upgrade" }
    }

    const newFactory = {
        user_id: new ObjectId(factory.user_id),
        level: factory.level + 1,
        cost: factory.cost * 2,
        production: factory.production,
        type: factory.type
    }
    if (factory._id) {
        Factory.updateOne({ _id: new ObjectId(factory._id) }, { $set: newFactory })
        Users.updateOne({ _id: new ObjectId(user._id) }, {
            $set: {
                money: user.money - factory.cost,
                ressources: userResources
            }
        })
        return { message: "You have upgraded successfully" }
    }

    return { message: "Wrong Factory" }
}