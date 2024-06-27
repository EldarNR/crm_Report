<template>
    <header class="bg-gray-50">
        <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div class="sm:flex sm:items-center sm:justify-between">
                <div class="text-center sm:text-left">
                    <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">Welcome Back, {{ user?.email || 'Admin' }}!
                    </h1>

                    <p class="mt-1.5 text-sm text-gray-500">Let's check out the new complaints! 🎉</p>
                </div>

                <admin />

            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import admin from './admin/admin.vue';


const user = ref(useSupabaseUser());
const router = useRouter();

</script>
