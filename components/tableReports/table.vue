<template>
    <div class=" max-w-[1111px] ">
        <!-- <p class="block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <report v-if="reportShow" :list="activeReport" />
        <div v-else class="font-bold text-2xl">
            <p>{{ translate('Выберите из списка', 'Тізімнен таңдаңыз') }}</p>
        </div>
        </p> -->
        <div class="flex flex-col items-center justify-start px-8 py-8 ">
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
                    <TableRow v-for="(item, i) in list" :key="item.id" @click="routPush(item.id)"
                        class="text-center font-medium">
                        <input type="checkbox" class="block ml-2 my-auto mt-4" v-model="selected" :value="item.id" />

                        <TableCell :key="item.id">
                            {{ i }}
                        </TableCell>
                        <TableCell :key="item.id">
                            {{ item.id }}
                        </TableCell>
                        <TableCell :key="item.id">
                            {{ item.departament }}
                        </TableCell>
                        <TableCell :key="item.id">
                            <div :class="statusClass(item.status)" class="w-[10px] h-[10px] rounded-xl mx-auto" />
                        </TableCell>
                        <TableCell :key="item.id">
                            {{ item.created_at }}
                        </TableCell>
                        <TableCell :key="item.id">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" class="mx-auto"
                                @click.stop="removeReport(item.id)" xmlns="http://www.w3.org/2000/svg">
                                <rect width="22" height="22" rx="4" fill="#646464" />
                                <path
                                    d="M5.6665 7.66667H16.3332M9.6665 10.3333V14.3333M12.3332 10.3333V14.3333M6.33317 7.66667L6.99984 15.6667C6.99984 16.0203 7.14031 16.3594 7.39036 16.6095C7.64041 16.8595 7.97955 17 8.33317 17H13.6665C14.0201 17 14.3593 16.8595 14.6093 16.6095C14.8594 16.3594 14.9998 16.0203 14.9998 15.6667L15.6665 7.66667M8.99984 7.66667V5.66667C8.99984 5.48986 9.07008 5.32029 9.1951 5.19526C9.32012 5.07024 9.48969 5 9.6665 5H12.3332C12.51 5 12.6796 5.07024 12.8046 5.19526C12.9296 5.32029 12.9998 5.48986 12.9998 5.66667V7.66667"
                                    stroke="#F9F9F9" stroke-linecap="round" stroke-linejoin="round" />
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

const headMenu: any = [{ title: { ru: ['#', 'id', 'Жалобы', 'Статус', 'Дата', 'Действие'], kz: ['#', 'id', 'Шағымдар', 'Мәртебесі', 'Күні', 'Әрекет'] } }];

const currentHeadMenu = computed(() => headMenu[0].title[state.$state.language]);

const isDateColumn = (item: string) => item === headMenu[0].title.ru[4] || item === headMenu[0].title.kz[4];
const isStatusColumn = (item: string) => item === headMenu[0].title.ru[3] || item === headMenu[0].title.kz[3];

const statusClass = (status: string) => {
    if (status === 'viewed') return 'bg-green-500';
    if (status === 'awaits') return 'bg-blue-400';
    return 'bg-red-500';
};
</script>
