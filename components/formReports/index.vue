<template>
    <section class="flex items-center justify-center">
        <div class="mx-auto my-auto md:w-[500px] px-4 py-10 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 gap-x-16 gap-y-8">
                <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">

                    <Alerts :title="text" :description="description" :svg="svg" :open="isOpen"
                        @update:open="isOpen = $event" />

                    <p class="text-2xl font-bold text-center p-2 md:text-2xl sm:text-md">Заполните форму</p>

                    <div class="flex flex-row cursor-pointer items-center justify-center gap-4 p-2">
                        <SVG :title="'incognito-circle'"
                            :d='`M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M14.92 12.81C13.84 12.81 12.95 13.56 12.71 14.56C12.17 14.33 11.66 14.39 11.29 14.55C11.05 13.55 10.15 12.81 9.08 12.81C7.83 12.81 6.82 13.82 6.82 15.07C6.82 16.32 7.83 17.33 9.08 17.33C10.28 17.33 11.24 16.42 11.33 15.25C11.53 15.12 12.04 14.86 12.67 15.26C12.77 16.42 13.73 17.33 14.92 17.33C16.17 17.33 17.18 16.32 17.18 15.07C17.18 13.82 16.17 12.81 14.92 12.81M9.08 13.45C10 13.45 10.7 14.18 10.7 15.07C10.7 15.96 10 16.69 9.08 16.69C8.19 16.69 7.46 15.96 7.46 15.07C7.46 14.18 8.19 13.45 9.08 13.45M14.92 13.45C15.81 13.45 16.54 14.18 16.54 15.07C16.54 15.96 15.81 16.69 14.92 16.69C14 16.69 13.3 15.96 13.3 15.07C13.3 14.18 14 13.45 14.92 13.45M17.83 11.5H6.17V12.17H17.83V11.5M14.15 6.89C14 6.59 13.67 6.43 13.35 6.53L12 7L10.65 6.53L10.61 6.5C10.29 6.43 9.95 6.61 9.84 6.92L8.36 10.83H15.64L14.16 6.92L14.15 6.89Z`'></SVG>
                        <p class="flex flex-row">Анонимный режим

                            <Modal :title="'Важная информация!'">
                                <template v-slot:trigger>
                                    <SVG class="ml-2"
                                        :d="'M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z'"
                                        :title="'info'">
                                    </SVG>
                                </template>
                                <template v-slot:body>
                                    <div>
                                        <p>
                                            Анонимные заявки не отслеживаются, но будут рассмотрены.<br>
                                        </p>
                                        <p>
                                            Если вы хотите отслеживаемую заявку, просим перейти в обычный режим.<br>

                                            В обычном режиме вы получите уведомления о ходе рассмотрения вашей заявки и
                                            сможете взаимодействовать с нашей службой поддержки для получения
                                            дополнительной информации.
                                        </p>

                                    </div>
                                </template>
                            </Modal>
                        </p>

                        <div class="flex items-center">
                            &#8203;
                            <input type="checkbox" @click="changeValue" class="size-4 rounded border-gray-400" />
                        </div>
                    </div>

                    <form @submit.prevent="validateAndSubmitForm" class="space-y-4">
                        <div v-if="!anonymous">
                            <input v-model="form.default.FullName" class="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Имя Фамилия Отчество" type="text" id="name" />
                        </div>
                        <div v-if='!anonymous' class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label class="sr-only" for="email">Email</label>
                                <input v-model="form.default.email"
                                    class="w-full rounded-lg border-gray-200 p-3 text-sm" placeholder="Email"
                                    type="email" id="email" />
                            </div>

                            <div>
                                <label class="sr-only" for="phone">Телефон</label>
                                <input v-model="form.default.phone"
                                    class="w-full rounded-lg border-gray-200 p-3 text-sm" placeholder="Телефон"
                                    type="tel" id="phone" />
                            </div>
                        </div>
                        <div>
                            <label class="sr-only" for="message">Жалоба</label>
                            <textarea v-model="form.message" class="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Жалоба" rows="8" id="message" />

                            <div class="grid w-full max-w-sm items-center gap-1.5">
                                <Label for="picture">Файл</Label>
                                <Input id="picture" type="file" @change="handleFileUpload" />
                            </div>
                        </div>
                        <button type="submit"
                            class="inline-block mt-4 w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto">
                            Отправить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>


<script setup lang="ts">
import SVG from '../ui/svg/SVG.vue';
import Alerts from '~/components/ui/customAlert/alertCustome.vue';
import { useStorage } from '~/state';
import { ref, reactive, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Modal from '../dialog/modal.vue';

interface DefaultForm {
    FullName: string;
    email: string;
    phone: string;
    file: File | null;
}

interface AnonymousForm {
    file: File | null;
}

interface Form {
    default: DefaultForm;
    anonymous: AnonymousForm;
    message: string;
    departament: string[];
}

export interface Organization {
    created_at: string;
    id: number;
    idDepartament: number;
    name: string;
    nameArray: string[];
}

const state = useStorage();
const route = useRoute();
const form = reactive<Form>({
    default: {
        FullName: '',
        email: '',
        phone: '',
        file: null,
    },
    anonymous: {
        file: null,
    },
    message: '',
    departament: []
});

const text = ref<string>('');
const description = ref<string>('');
const svg = ref<string>('');
const anonymous = ref<boolean>(false);
const isOpen = ref<boolean>(false);
const listOrganization = ref<Organization[]>([]);
const selectedOrganization = ref<Organization | null>(null);

const changeValue = () => {
    anonymous.value = !anonymous.value;
};

const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0] || null;
    if (anonymous.value) {
        form.anonymous.file = file;
    } else {
        form.default.file = file;
    }
};

const isEmpty = (value: string): boolean => {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string' && value.trim() === '') return true;
    return false;
};

const setError = (title: string, message: string, icon: string): void => {
    text.value = title;
    description.value = message;
    svg.value = icon;
    isOpen.value = true;
};

const validateAndSubmitForm = () => {
    if (anonymous.value) {
        if (isEmpty(form.message)) {
            setError('Ошибка', 'Пожалуйста, заполните сообщение.', 'Error');
            console.log(form.message)
            return;
        }
        else {
            console.log(undefined, form.message, undefined, undefined, form.departament, true, form.anonymous.file, state.generateUUID())
            state.PostMessage(undefined, form.message, undefined, undefined, form.departament, true, form.anonymous.file, state.generateUUID());
        }
        console.log('Anonymous form:', form.anonymous);
    } else {
        const isDefaultFormValid = !isEmpty(form.default.FullName) &&
            !isEmpty(form.default.email) &&
            !isEmpty(form.default.phone) &&
            !isEmpty(form.message) && form.departament.length > 0;

        if (!isDefaultFormValid) {
            setError('Ошибка', 'Пожалуйста, заполните все поля.', 'Error');
            console.log(form.default.FullName, form.message, form.default.email, form.default.phone, form.departament, false, form.default.file)
            return;
        }

        if (form.default.file) {
            console.log(form.default.FullName, form.message, form.default.email, form.default.phone, form.departament, false, form.default.file, state.generateUUID())
            state.PostMessage(form.default.FullName, form.message, form.default.email, form.default.phone, form.departament, false, form.default.file, state.generateUUID());
        } else {
            console.log(form.default.FullName, form.message, form.default.email, form.default.phone, form.departament, false)
            state.PostMessage(form.default.FullName, form.message, form.default.email, form.default.phone, form.departament, false);
        }

        setError('Успешно!', 'Форма отправлена успешно.', 'Success');
    }
};


const selectOrganization = (organization: Organization) => {
    selectedOrganization.value = organization;
    form.departament = organization.nameArray;
};

watch(
    () => state.AllOrganization.List,
    (newValue) => {
        listOrganization.value = newValue;
        const id = Number(route.params.id);
        const organization = newValue.find((org) => org.idDepartament === id);
        if (organization) {
            selectedOrganization.value = organization;
            form.departament = organization.nameArray;
        }
    }
);

onMounted(() => {
    const id = Number(route.params.id);
    const organization = state.AllOrganization.List.find((org) => org.idDepartament === id);
    if (organization) {
        selectedOrganization.value = organization;
        form.departament = organization.nameArray;
        console.log()
    }
});
</script>
