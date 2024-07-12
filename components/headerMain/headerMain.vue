<template>
    <div class="bg-gray-50 w-[983px]  mx-auto">
        <div class="mx-auto  p-2 px-4 py-8 ">
            <div class='relative '>
                <div class="block text-center">
                    <h1 class="text-2xl text-center font-semibold text-gray-900"> {{ state.$state.language
                        ===
                        'ru' ?
                        text.ru : text.kz }}
                    </h1>
                </div>

                <admin class="absolute ml-2 right-0 bottom-0 top-0" />

            </div>

        </div>
        <div class=" h-[2px] bg-[#E5E5E5]" />
    </div>
</template>

<script setup lang="ts">
import admin from './admin/admin.vue';
import { useSupabaseUser } from '#imports';
import { ref } from 'vue'
import { useStorage } from '~/state';

const state = useStorage();
const user = ref(useSupabaseUser());
const router = useRouter();

const text = { ru: 'Жалобы', kz: 'Шағымдар' }

</script>
