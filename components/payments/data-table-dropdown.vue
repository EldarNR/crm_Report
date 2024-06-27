<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { columns } from './columns'
import type { Payment } from './columns'
import DataTable from './data-table.vue'
import { MoreHorizontal } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

defineProps<{
    payment: {
        id: string
    }
}>()

const data = ref<Payment[]>([])

function copy(id: string) {
    navigator.clipboard.writeText(id)
}
async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: '728ed52f',
            amount: 100,
            status: 'pending',
            email: 'm@example.com',
        },
        // ...
    ]
}

onMounted(async () => {
    data.value = await getData()
})
</script>

<template>

    <div class="container py-10 mx-auto">
        <!-- <DataTable :columns="columns" :data="data" /> -->

        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="ghost" class="w-8 h-8 p-0">
                    <span class="sr-only">Open menu</span>
                    <MoreHorizontal class="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem @click="copy(payment.id)">
                    Copy payment ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
</template>