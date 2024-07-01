<template>
    <div class="flex h-screen flex-col justify-between border-e bg-white">
        <div class="px-4 py-6">
            <span class="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
                CRM
            </span>

            <ul class="mt-6 space-y-1">
                <NuxtLink v-for="(item, i) in menu" :key="i" :to="item.to"
                    class="block rounded-lg bg-gray-100 px-8 py-2 text-sm font-medium text-gray-700">
                    {{ item.title }}
                </NuxtLink>
            </ul>
        </div>

        <div class="sticky inset-x-0 bottom-0 border-t border-gray-100">
            <NuxtLink :to="'/profile'" class="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                <Avatar class="bg-neutral-200">
                    <SVG :title="'alien'" :color="'green'"
                        :d="'M12,3C16.97,3 21,6.58 21,11C21,15.42 15,21 12,21C9,21 3,15.42 3,11C3,6.58 7.03,3 12,3M10.31,10.93C9.29,9.29 7.47,8.58 6.25,9.34C5.03,10.1 4.87,12.05 5.89,13.69C6.92,15.33 8.74,16.04 9.96,15.28C11.18,14.5 11.33,12.57 10.31,10.93M13.69,10.93C12.67,12.57 12.82,14.5 14.04,15.28C15.26,16.04 17.08,15.33 18.11,13.69C19.13,12.05 18.97,10.1 17.75,9.34C16.53,8.58 14.71,9.29 13.69,10.93M12,17.75C10,17.75 9.5,17 9.5,17C9.5,17.03 10,19 12,19C14,19 14.5,17 14.5,17C14.5,17 14,17.75 12,17.75Z'"></SVG>
                </Avatar>

                <div>
                    <p class="text-xs">
                        <strong class="block font-medium">Admin</strong>
                        <span> {{ user?.email }} </span>
                    </p>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import SVG from '../ui/svg/SVG.vue';

const user = useSupabaseUser();

let menu = [
    { title: 'Жалобы', to: '/main/' },
    { title: 'Организации', to: '/main/organization' },
    { title: 'О нас', to: '/main/about/' }
];
</script>