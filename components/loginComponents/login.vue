<template>
    <div class="flex items-center justify-center">
        <AlertCustome v-if="state.Error.auth.alert" :title="state.Error.auth.title"
            :description="state.Error.auth.message" :svg="state.Error.auth.svg" :open="isOpen"
            @update:open="isOpen = $event">
        </AlertCustome>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div class="w-full bg-neutral-50 rounded-lg shadow border">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <p class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Admin
                    </p>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input v-model="login.email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                            type="text" />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input v-model="login.password"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                            type="password" />
                    </div>
                    <div>
                        <NuxtLink
                            class="rounded-sm mt-3 bg-neutral-200 p-2 hover:bg-neutral-400 hover:text-neutral-50 cursor-pointer"
                            @click="postUser">Login
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect, watch } from 'vue';
import { useStorage } from '~/state/index';
import AlertCustome from '~/components/ui/customAlert/alertCustome.vue';
import { useRouter } from 'vue-router';
import { useSupabaseUser } from '#imports';

const state = useStorage();
const user = useSupabaseUser();

const login = reactive({
    email: '' as string,
    password: '' as string
});

const isOpen = ref<boolean>(false);
const router = useRouter();

const postUser = async () => {
    if (login.email.trim() === '' || login.password.trim() === '') {
        state.RangeError('Login and password must not be empty.', 'Error');
    } else {
        await state.SignIn(login.email, login.password);
    }
};
watch(
    () => [state.Error.auth.title, user.value?.id], // Следим за изменениями этих значений
    ([authTitle, userId]) => {
        if (authTitle === 'Success' || userId) {
            isOpen.value = state.Error.auth.alert;
            navigateTo('/main');
        }
    },
    { immediate: true } // Немедленно выполняем callback один раз при монтировании
);


</script>