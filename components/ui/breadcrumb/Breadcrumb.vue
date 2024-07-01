<template>

    <nav aria-label="Breadcrumb" class="flex">
        <ol class="flex overflow-hidden rounded-lg border border-gray-200 text-gray-600">
            <li class="flex items-center">
                <a href="#" class="flex h-10 items-center gap-1.5 bg-gray-100 px-4 transition hover:text-gray-900">
                    <SVG
                        :d="'M19.07,4.93C17.22,3 14.66,1.96 12,2C9.34,1.96 6.79,3 4.94,4.93C3,6.78 1.96,9.34 2,12C1.96,14.66 3,17.21 4.93,19.06C6.78,21 9.34,22.04 12,22C14.66,22.04 17.21,21 19.06,19.07C21,17.22 22.04,14.66 22,12C22.04,9.34 21,6.78 19.07,4.93M17,12V18H13.5V13H10.5V18H7V12H5L12,5L19.5,12H17Z'">

                    </SVG>

                    <span class="ms-1.5 text-xs font-medium"> Home </span>
                </a>
            </li>

            <li class="relative flex items-center">
                <span
                    class="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180">
                </span>

                <a href="#"
                    class="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium transition hover:text-gray-900">
                    {{ route.name }}
                </a>
            </li>
        </ol>
    </nav>
</template>

<script setup lang="ts">
import SVG from '~/components/ui/svg/SVG.vue';


const route = useRoute();
</script>
