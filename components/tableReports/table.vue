<template>
    <div class="max-w-[1111px]">
        <div class="flex flex-col items-center justify-start px-8 py-8">
            <tool></tool>
            <Table v-if="!loading">
                <TableHeader>
                    <TableRow>
                        <TableHead class="text-center cursor-pointer">
                            <input type="checkbox" class="mr-2" v-model="selectAll"
                                @click="toggleSelectAll(selectAll)" />
                        </TableHead>
                        <TableHead v-for="(item, i) in currentHeadMenu" :key="i" class="text-center cursor-pointer">
                            <DropdownMenu>
                                <DropdownMenuTrigger class="border-l-[2px]  border-[#B8B8B8] "><span class="ml-[3px]">{{
                                    item }}</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <div v-if="isDateColumn(item)">
                                        <DropdownMenuLabel>{{ translate('Сортировка по дате', 'Күні бойынша сұрыптау')
                                            }}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem @click="state.sortByData(true)">Сортировка от старых к новым
                                        </DropdownMenuItem>
                                        <DropdownMenuItem @click="state.sortByData(false)">Сортировка от новых к старым
                                        </DropdownMenuItem>
                                    </div>
                                    <div v-else-if="isStatusColumn(item)">
                                        <DropdownMenuLabel>{{ translate('Сортировка по статусу', 'Күй бойынша сұрыптау')
                                            }}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                        <DropdownMenuItem>Billing</DropdownMenuItem>
                                        <DropdownMenuItem>Team</DropdownMenuItem>
                                        <DropdownMenuItem>Subscription</DropdownMenuItem>

                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody class="mt-2 text-center mx-auto">
                    <TableRow v-if="list.length === 0">
                        <TableCell colspan="100%">List empty</TableCell>
                    </TableRow>
                    <TableRow v-for="(item, i) in list" :key="item.id" @click="routPush(item.id)" class="font-medium">
                        <input type="checkbox" class="block ml-2 my-auto mt-4" v-model="selected" :value="item.id" />
                        <TableCell :key="item.id">
                            {{ i }}
                        </TableCell>
                        <TableCell :key="item.id">
                            {{ item.id }}
                        </TableCell>
                        <TableCell :key="item.id">
                            {{ translate(item.departament[0], item.departament[1]) }}
                        </TableCell>
                        <TableCell :key="item.id">
                            {{ formatDate(item.created_at) }}
                        </TableCell>
                        <TableCell :key="item.id">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                class="bg-[#5f2121] w-[22px] h-[22px] mx-auto flex item-center justify-center"
                                @click.stop="removeReport(item.id)" xmlns="http://www.w3.org/2000/svg">

                                <path class="bg-red-400"
                                    d="M0.666504 3.66667H11.3332M4.6665 6.33333V10.3333M7.33317 6.33333V10.3333M1.33317 3.66667L1.99984 11.6667C1.99984 12.0203 2.14031 12.3594 2.39036 12.6095C2.64041 12.8595 2.97955 13 3.33317 13H8.6665C9.02013 13 9.35926 12.8595 9.60931 12.6095C9.85936 12.3594 9.99984 12.0203 9.99984 11.6667L10.6665 3.66667M3.99984 3.66667V1.66667C3.99984 1.48986 4.07008 1.32029 4.1951 1.19526C4.32012 1.07024 4.48969 1 4.6665 1H7.33317C7.50998 1 7.67955 1.07024 7.80458 1.19526C7.9296 1.32029 7.99984 1.48986 7.99984 1.66667V3.66667"
                                    stroke="#cc1b1b" stroke-linecap="round" stroke-linejoin="round" />

                            </svg>


                        </TableCell>

                    </TableRow>
                </TableBody>
            </Table>
            <span v-else>Loading</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from 'vue';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import report from '../report/report.vue';
import SVG from '../ui/svg/SVG.vue';
import { useStorage } from '~/state/index';
import tool from '../toolkits/tool.vue';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'vue-router';

interface Reports {
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
const router = useRouter();
const list = ref<any[]>([]);
const loading = ref<boolean>(true);
let activeReport = ref<Reports>({} as Reports);
let reportShow = ref<boolean>(false);
const selectAll = ref<boolean>(false);
const selected = ref<number[]>([]);

onMounted(() => {
    state.getAllReports();
});

watchEffect(() => {
    if (state.list.List) {
        list.value = state.list.List;
    }
    if (state.$state.Error) {
        loading.value = state.list.loading;
    }
});

const selectingReport = (item: Reports) => {
    reportShow.value = false;
    activeReport.value = item;
    reportShow.value = true;
};

const toggleSelectAll = (bool: boolean) => {
    if (!bool) {
        list.value.forEach(item => {
            if (!selected.value.includes(item.id)) {
                selected.value.push(item.id);
            }
        });
    } else {
        selected.value = [];
    }
};

const routPush = (id: number) => {
    navigateTo('/main/' + id)
}

const removeReport = (id?: number) => {
    if (selectAll.value) {
        state.removeReport(selected.value);
        list.value = [];
        selected.value = [];
        selectAll.value = false;
    } else {
        state.removeReport(id || selected.value);
        selected.value.forEach(selectedId => {
            list.value = list.value.filter(item => item.id !== selectedId);
        });
        selected.value = [];
    }
};

const translate = (ru: string, kz: string) => state.$state.language === 'ru' ? ru : kz;

const headMenu: any = [{ title: { ru: ['#', 'id', 'Жалобы', 'Дата', 'Действие'], kz: ['#', 'id', 'Шағымдар', 'Күні', 'Әрекет'] } }];

const currentHeadMenu = computed(() => headMenu[0].title[state.$state.language]);

const isDateColumn = (item: string) => item === headMenu[0].title.ru[4] || item === headMenu[0].title.kz[4];
const isStatusColumn = (item: string) => item === headMenu[0].title.ru[3] || item === headMenu[0].title.kz[3];

// Функция для форматирования даты
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const timeZoneOffset = 5 * 60 * 60 * 1000;
    const localTime = date.getTime() + timeZoneOffset;
    const localDate = new Date(localTime);

    const day = String(localDate.getUTCDate()).padStart(2, '0');
    const month = String(localDate.getUTCMonth() + 1).padStart(2, '0');
    const year = String(localDate.getUTCFullYear()).slice(-2);
    const hours = String(localDate.getUTCHours()).padStart(2, '0');
    const minutes = String(localDate.getUTCMinutes()).padStart(2, '0');

    return `${day}.${month}.${year}/${hours}:${minutes}`;
};
</script>
