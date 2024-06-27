<template>
    <div>
        organization
        <div v-if="!loading">
            <div v-for="item in list" :key="item.id">{{ item }}</div>
        </div>
        <div v-else>
            loading
        </div>

        <modal class="float-right" />


        <Table>

            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead class="w-[100px]">
                        #
                    </TableHead>
                    <TableHead>id</TableHead>
                    <TableHead>Организация</TableHead>
                    <TableHead class="text-right">
                        Жалобы
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="(item, i) in list" :key="item.id">
                    <TableCell class="font-medium">
                        {{ i }}
                    </TableCell>
                    <TableCell>{{ item.idDepartament }}</TableCell>
                    <TableCell>{{ item.name }}</TableCell>
                    <TableCell class="text-right">
                        4
                    </TableCell>
                    <TableCell>
                        <SVG :d="'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z'"
                            class="cursor-pointer" @click.stop=" state.removeOrganization(item.id)" title="delete"
                            :color="'red'"></SVG>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>

<script setup lang="ts">
import { useStorage } from '~/state/index'
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
} from '@/components/ui/table'
import modal from '~/components/dialog/modal.vue';


const state = useStorage();
let list = ref<Organization[]>([]);
const loading = ref<boolean>();

watchEffect(() => {
    if (state.$state.AllOrganization) {
        loading.value = state.$state.AllOrganization.loading;
        list.value = state.$state.AllOrganization.List;
    }
})

onMounted(() => {
    state.getAllOrganization();
})
</script>
