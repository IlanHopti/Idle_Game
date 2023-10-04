<script setup lang="ts">
import {useUserStore} from "@/stores/user";
import CoalResource from '@/assets/resources/coal.png';
import IronResource from '@/assets/resources/iron_ingot.png';
import WoodResource from '@/assets/resources/wood.png';
import StoneResource from '@/assets/resources/stone.png';
import CoinResource from '@/assets/resources/coin.png';
import DiamondResource from '@/assets/resources/diamond.png';
import GoldResource from '@/assets/resources/gold_ingot.png';


const userConnected = useUserStore()

const resources = userConnected.user.ressources

function image(key: string) {
    switch (key) {
        case 'wood':
            return WoodResource
        case 'stone':
            return StoneResource
        case 'coin':
            return CoinResource
        case 'coal':
            return CoalResource
        case 'diamond':
            return DiamondResource
        case 'gold':
            return GoldResource
        case 'iron':
            return IronResource
        default:
            return ''
    }
}

function upgradeQtyRender(qty: number) {
    const suffixes = ['', 'K', 'M', 'B', 'T']; // Suffixes for thousands, millions, billions, trillions, etc.
    let index = 0;

    while (qty >= 1000 && index < suffixes.length - 1) {
        qty /= 1000;
        index++;
    }

    return qty.toFixed(1) + suffixes[index];
}

</script>

<template>
    <div>
        <div v-for="(quantity, key) in resources" :key="key">
            <p v-if="quantity > 0" class="text-white flex items-center space-x-1">
                <img :src="image(key)" class="w-8 h-8" />
                <span class="font-bold">{{ key }}: {{ upgradeQtyRender(quantity) }}</span>
            </p>
        </div>
    </div>
</template>