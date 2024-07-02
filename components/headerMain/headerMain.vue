<template>
    <div class="bg-gray-50">
        <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div class="sm:flex sm:items-center sm:justify-between">
                <div class="text-center sm:text-left">
                    <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">Welcome Back, Admin!
                    </h1>

                    <p class="mt-1.5 text-sm text-gray-500">Let's check out the new complaints! 🎉</p>
                </div>

                <admin />

            </div>
            <vue-qrcode :value="value" @change="onDataUrlChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import admin from './admin/admin.vue';
import { useSupabaseUser } from '#imports';
import { ref } from 'vue';
import VueQrcode from 'vue-qrcode';

// Создаем переменные с помощью ref
const dataUrl = ref(null);
const value = ref('https://example.com');

// Функция для обновления dataUrl
const onDataUrlChange = (newDataUrl: null) => {
    dataUrl.value = newDataUrl;
};


const user = ref(useSupabaseUser());
const router = useRouter();

</script>
