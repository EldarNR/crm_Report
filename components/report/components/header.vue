<template>
    <header class="  bg-neutral-50 rounded-sm">

        <div class="mx-auto max-w-screen-md max-h-[250px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 ">
            <div class="flex flex-row justify-between">


                <div class=" flex text-center items-center">

                    <SVG :title="'report'" class="w-[50px] mr-2"
                        :d="props.name === '' ? 'M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M14.92 12.81C13.84 12.81 12.95 13.56 12.71 14.56C12.17 14.33 11.66 14.39 11.29 14.55C11.05 13.55 10.15 12.81 9.08 12.81C7.83 12.81 6.82 13.82 6.82 15.07C6.82 16.32 7.83 17.33 9.08 17.33C10.28 17.33 11.24 16.42 11.33 15.25C11.53 15.12 12.04 14.86 12.67 15.26C12.77 16.42 13.73 17.33 14.92 17.33C16.17 17.33 17.18 16.32 17.18 15.07C17.18 13.82 16.17 12.81 14.92 12.81M9.08 13.45C10 13.45 10.7 14.18 10.7 15.07C10.7 15.96 10 16.69 9.08 16.69C8.19 16.69 7.46 15.96 7.46 15.07C7.46 14.18 8.19 13.45 9.08 13.45M14.92 13.45C15.81 13.45 16.54 14.18 16.54 15.07C16.54 15.96 15.81 16.69 14.92 16.69C14 16.69 13.3 15.96 13.3 15.07C13.3 14.18 14 13.45 14.92 13.45M17.83 11.5H6.17V12.17H17.83V11.5M14.15 6.89C14 6.59 13.67 6.43 13.35 6.53L12 7L10.65 6.53L10.61 6.5C10.29 6.43 9.95 6.61 9.84 6.92L8.36 10.83H15.64L14.16 6.92L14.15 6.89Z' : 'M9,5A4,4 0 0,1 13,9A4,4 0 0,1 9,13A4,4 0 0,1 5,9A4,4 0 0,1 9,5M9,15C11.67,15 17,16.34 17,19V21H1V19C1,16.34 6.33,15 9,15M16.76,5.36C18.78,7.56 18.78,10.61 16.76,12.63L15.08,10.94C15.92,9.76 15.92,8.23 15.08,7.05L16.76,5.36M20.07,2C24,6.05 23.97,12.11 20.07,16L18.44,14.37C21.21,11.19 21.21,6.65 18.44,3.63L20.07,2Z'"></SVG>

                    <div class="flex flex-col ml-2 sm:text-left text-md font-bold text-gray-900 ">
                        <h1>{{ props.name === '' ? 'Anonymous' : props.name }}</h1>
                        <h1>{{ props.email === '' ? '' : props.email }}</h1>
                        <h1>{{ props.phone === '' ? '' : props.phone }}</h1>

                        <span class="flex flex-row mt-1.5"><SVG :title="'complaint about'"
                                :d="'M21,12L14,5V9C7,10 4,15 3,20C5.5,16.5 9,14.9 14,14.9V19L21,12Z'"></SVG>
                            <b class="text-sm">{{ props.organization }}</b>
                        </span>
                    </div>
                </div>

                <div class="">
                    <h1>{{ props.date }}</h1>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import SVG from '~/components/ui/svg/SVG.vue';

interface header {
    name?: string | 'anonymous'
    date: string,
    email?: string | 'anonymous',
    phone?: string | 'anonymous',
    organization: string
}


const props = defineProps<header>()
</script>
