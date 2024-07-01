<template>
    <div class=" lg:grid  grid-cols-12">
        <p class="block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <report v-if="reportShow" :list="activeReport" />
        <div v-else class=" font-bold text-2xl">
            Выберите из списка
        </div>
        </p>
        <div
            class="flex flex-col items-center justify-start px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <tool></tool>
            <Table v-if="!loading">
                <TableHeader>
                    <TableRow>
                        <TableHead class="text-center cursor-pointer">
                            <input type="checkbox" class="mr-2" v-model="selectAll"
                                @click="toggleSelectAll(selectAll)" />
                        </TableHead>
                        <TableHead v-for="item in headMenu" :key="item" class="text-center cursor-pointer">
                            {{ item }}
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody class="mt-2 text-center mx-auto">
                    <TableRow v-if="list.length === 0">
                        <TableCell colspan="100%">List empty</TableCell>
                    </TableRow>
                    <TableRow v-for="(item, i) in list" :key="item.id" @click="selectingReport(item)"
                        class="text-center">
                        <input type="checkbox" class="ml-2 my-auto mt-4" v-model="selected" :value="item.id" />
                        <TableCell :key="item.id" class="font-medium">
                            {{ i }}
                        </TableCell>
                        <TableCell :key="item.id" class="font-medium">
                            {{ item.departament }}
                        </TableCell>
                        <TableCell :key="item.id" class="font-medium">
                            <div v-if="item.status === 'viewed'"
                                class="w-[10px] h-[10px] bg-green-500 rounded-xl mx-auto" />
                            <div v-else-if="item.status === 'awaits'"
                                class="w-[10px] h-[10px] bg-blue-400 rounded-xl mx-auto" />
                            <div v-else class="w-[10px] h-[10px] bg-red-500 rounded-xl mx-auto" />
                        </TableCell>
                        <TableCell :key="item.id" class="font-medium">
                            <SVG :d="'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z'"
                                class="cursor-pointer" @click.stop="removeReport(item.id)" title="delete"
                                :color="'red'"></SVG>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <span v-else>Loading</span>
        </div>
    </div>
</template>



<script setup lang="ts">
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import report from '../report/report.vue';
import SVG from '../ui/svg/SVG.vue';
import { useStorage } from '~/state/index'
import tool from '../toolkits/tool.vue';
import Checkbox from '../ui/checkbox/Checkbox.vue';


interface reports {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    file: File | null;
    description: string;
    created_at: string;
    departament: string;
    anonymouseMode: boolean;
    fileUid: string;
}

const state = useStorage();
const list = ref([]) as any;
const loading = ref<boolean>(true);
let activeReport = ref([]) as unknown as reports;
let reportShow = ref<boolean>(false);
const selectAll = ref<boolean>(false);
const selected = ref<number[]>([]);

onMounted(() => {
    state.getAllReports();
});

watchEffect(() => {
    if (state.$state.AllReports.List) {
        list.value = state.$state.AllReports.List;
        console.log(list.value)
    }
    if (state.$state.Error) {
        loading.value = state.$state.AllReports.loading;
    }
});

const selectingReport = (item: reports) => {
    reportShow.value = false;
    activeReport = item;
    reportShow.value = true;
};

const toggleSelectAll = (bool: boolean) => {
    if (!bool) {
        list.value.forEach((item: reports) => {
            selected.value.push(item.id)
        });
    }
    else {
        selected.value = [];
    }

};
const removeReport = (id?: number) => {
    if (selectAll.value) {
        state.removeReport(selected.value)
        list.value = [];
        selected.value = [];
        selectAll.value = false;
    } else {
        state.removeReport(id || selected.value)
        selected.value.forEach(selectedId => {
            list.value = list.value.filter((item: { id: number; }) => item.id !== selectedId);
        });
        selected.value = [];
    }
}

const headMenu = ['#', 'report', 'status'];
</script>