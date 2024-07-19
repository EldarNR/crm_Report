<template>
    <div class="max-w-[1111px]">
        <div class="flex flex-col items-center justify-start px-8 py-8">
            <tool></tool>
            <Table v-if="!loading">
                <TableHeader>
                    <TableRow>
                        <TableHead class="text-center cursor-pointer w-[30px]">
                            <input type="checkbox" class="mr-2" v-model="selectAll"
                                @click="toggleSelectAll(selectAll)" />
                        </TableHead>
                        <TableHead v-for="(item, i) in currentHeadMenu" :key="i"
                            class="cursor-pointer w-[20px]">
                            <div class="ml-[3px]" :class="i !== 0 ? 'border-l-[2px] border-[#B8B8B8]' : ''">
                                <p v-if="item !== 'Дата' && item !== 'Күні'">
                                    {{ item }}
                                </p>
                                <div v-else>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            {{ item }}
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>{{ translate('Сортировка по дате',
                                                'Күні-бойыншасұрыптау') }}</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem @click="state.sortByData(true)">Сортировка от старых к
                                                новым</DropdownMenuItem>
                                            <DropdownMenuItem @click="state.sortByData(false)">Сортировка от новых к
                                                старым</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody class="mt-2 text-center mx-auto">
                    <TableRow v-if="list.length === 0">
                        <TableCell colspan="100%">List empty</TableCell>
                    </TableRow>
                    <TableRow v-for="(item, i) in list" :key="item.id" @click="routPush(item.id)" class="font-medium">
                        <TableCell>
                            <input type="checkbox" v-model="selected" :value="item.id" />
                        </TableCell>
                        <TableCell>
                            {{ i }}
                        </TableCell>
                        <TableCell>
                            {{ item.id }}
                        </TableCell>
                        <TableCell>
                            {{ translate(item.departament[0], item.departament[1]) }}
                        </TableCell>
                        <TableCell>
                            {{ formatDate(item.created_at) }}
                        </TableCell>
                        <TableCell>
                            <div class="flex items-center justify-center bg-[#646464] w-[22px] h-[22px] rounded-md mx-auto hover:bg-red-600 cursor-pointer"
                                @click.stop="removeReport(item.id)">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2.6665 4.66667H13.3332M6.6665 7.33333V11.3333M9.33317 7.33333V11.3333M3.33317 4.66667L3.99984 12.6667C3.99984 13.0203 4.14031 13.3594 4.39036 13.6095C4.64041 13.8595 4.97955 14 5.33317 14H10.6665C11.0201 14 11.3593 13.8595 11.6093 13.6095C11.8594 13.3594 11.9998 13.0203 11.9998 12.6667L12.6665 4.66667M5.99984 4.66667V2.66667C5.99984 2.48986 6.07008 2.32029 6.1951 2.19526C6.32012 2.07024 6.48969 2 6.6665 2H9.33317C9.50998 2 9.67955 2.07024 9.80458 2.19526C9.9296 2.32029 9.99984 2.48986 9.99984 2.66667V4.66667"
                                        stroke="#F9F9F9" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
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
