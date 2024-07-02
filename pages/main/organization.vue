<template>
    <div class="w-full  p-2">
        Организации
        <div class="bg-neutral-50 rounded-lg   border p-2 m-2">
            <Modal :title="'Создание формы'" :description="'Заполните форму'">
                <template v-slot:trigger>
                    <Button variant="outline">Новая организацию</Button>
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
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-[100px]">#</TableHead>
                        <TableHead>id</TableHead>
                        <TableHead>Организация</TableHead>
                        <TableHead class="text-right">Жалобы</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="(item, i) in list" :key="item.id">
                        <TableCell class="font-medium">{{ i }}</TableCell>
                        <TableCell>{{ item.idDepartament }}</TableCell>
                        <TableCell>{{ item.name }}</TableCell>
                        <TableCell class="text-right">4</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger as-child>
                                    <span class="">...</span>
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
import { ref, reactive, onMounted, watchEffect } from 'vue';
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

const text = [
    { title: 'Название организации', example: 'Национальный банк РК', modal: 'organization' },
    { title: 'Руководитель', example: 'Иванов Иван Иванович', modal: 'supervisor' }
];
</script>

<style scoped></style>
