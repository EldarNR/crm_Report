<template>
    <div class="w-full p-2">
        Организации
        <div class="bg-neutral-50 rounded-lg border p-2 m-2">
            <Modal :title="'Создание формы'" :description="'Заполните форму'">
                <template v-slot:trigger>
                    <Button variant="outline" class="text-xl">+</Button>
                </template>
                <template v-slot:body>
                    <div class="grid grid-cols-4 items-center gap-4" v-for="(item, i) in text" :key="i">
                        <Label for="name" class="text-right text-xs">
                            {{ item.title }}
                        </Label>
                        <Input v-model="data[item.modal]" :placeholder="'пример: ' + item.example" class="col-span-3" />
                    </div>
                </template>
                <template v-slot:footer>
                    <Button type="submit" @click="postOrganization()">
                        Создать
                    </Button>
                </template>
            </Modal>

            <Table>
                <!-- <TableCaption>A list of your recent invoices.</TableCaption> -->
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-[100px]">#</TableHead>
                        <TableHead v-for="(item, i) in currentHeadMenu" :key="i"> {{ item }}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="(item, i) in list" :key="item.id">
                        <TableCell class="font-medium">{{ i }}</TableCell>
                        <TableCell>{{ item.idDepartament }}</TableCell>
                        <TableCell>{{ item.name }}</TableCell>
                        <TableCell>4</TableCell>
                        <TableCell>
                            <Modal :title="'QR'" :description="''">
                                <template v-slot:trigger>
                                    <SVG :title='`qr`' @click.stop
                                        :d="'M4,4H10V10H4V4M20,4V10H14V4H20M14,15H16V13H14V11H16V13H18V11H20V13H18V15H20V18H18V20H16V18H13V20H11V16H14V15M16,15V18H18V15H16M4,20V14H10V20H4M6,6V8H8V6H6M16,6V8H18V6H16M6,16V18H8V16H6M4,11H6V13H4V11M9,11H13V15H11V13H9V11M11,6H13V10H11V6M2,2V6H0V2A2,2 0 0,1 2,0H6V2H2M22,0A2,2 0 0,1 24,2V6H22V2H18V0H22M2,18V22H6V24H2A2,2 0 0,1 0,22V18H2M22,22V18H24V22A2,2 0 0,1 22,24H18V22H22Z'"></SVG>
                                </template>
                                <template v-slot:body>
                                    <div class="flex justify-center items-center">
                                        <vue-qrcode :value="url + item.idDepartament" type="image/png" :width="360"
                                            :color="{ dark: '#000000ff', light: '#ffffffff' }"
                                            @change="onDataUrlChange" />
                                    </div>
                                </template>
                                <template v-slot:footer>
                                </template>
                            </Modal>
                        </TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger as-child>
                                    <span class="cursor-pointer">...</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent class="w-56">
                                    <DropdownMenuLabel>Setting</DropdownMenuLabel>
                                    <DropdownMenuItem>
                                        <Modal :title="'Создание формы'" :description="'Заполните форму'">
                                            <template v-slot:trigger>
                                                <span @click.stop>Edit</span>
                                            </template>
                                            <template v-slot:body>
                                                <div class="grid grid-cols-4 items-center gap-4">
                                                    <Label for="name" class="text-right text-xs">Называние</Label>
                                                    <Input :placeholder="item.name" v-model="editName"
                                                        class="col-span-3" />
                                                </div>
                                            </template>
                                            <template v-slot:footer>
                                                <Button type="submit" @click="changeNameOrganization(item.id)">
                                                    Save changes
                                                </Button>
                                            </template>
                                        </Modal>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <span>Support</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem @click.stop="state.removeOrganization(item.id)">
                                        <span>Delete</span>
                                        <DropdownMenuShortcut>
                                            <SVG :d="'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z'"
                                                class="cursor-pointer" title="delete" :color="'red'"></SVG>
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watchEffect, computed } from 'vue';
import vueQrcode from 'vue-qrcode';
import { useStorage } from '~/state/index';
import { type Organization } from '~/components/formReports/index.vue';
import SVG from '~/components/ui/svg/SVG.vue';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import Modal from '~/components/dialog/modal.vue';

interface Data {
    [key: string]: string;
}

const state = useStorage();
const list = ref<Organization[]>([]);
const loading = ref<boolean>(true);
const editName = ref<string>('');
const language = ref<string>('ru');

// Создаем переменные с помощью ref
const dataUrl = ref(null);
const url = ref('http://localhost:3000/report/');

// Функция для обновления dataUrl
const onDataUrlChange = (newDataUrl: null) => {
    dataUrl.value = newDataUrl;
};

watchEffect(() => {
    const allOrganization = state.$state.AllOrganization;
    if (allOrganization) {
        loading.value = allOrganization.loading;
        list.value = allOrganization.List;
    }
});

const data: Data = reactive({
    organization: '',
    supervisor: ''
});

const postOrganization = async () => {
    if (data.organization.trim() === '' || data.supervisor.trim() === '') {
        console.log('Error, post input empty!');
    } else {
        state.createOrganization(data.organization, data.supervisor);
    }
};

const changeNameOrganization = async (id: number) => {
    if (editName.value.trim() === '') {
        console.log('Error, edit input empty!')
    }
    else {
        console.log(id, editName.value)
        state.changeNameOrganizating(id, editName.value);
    }
}

onMounted(() => {
    state.getAllOrganization();
});

const headMenu: any = {
    ru: ['id', 'Организация', 'Жалобы', 'QR', 'Действия'],
    kz: ['id', 'Мекеме', 'Шағымдар', 'QR', 'Әрекеттер'],
};

const currentHeadMenu = computed(() => headMenu[state.$state.language]);

const text = [
    { title: 'Название организации', example: 'Национальный банк РК', modal: 'organization' },
    { title: 'Руководитель', example: 'Иванов Иван Иванович', modal: 'supervisor' }
];
</script>

<style scoped></style>