<template>
    <div class="flex flex-row justify-center items-center  p-2 w-full rounded-lg">
        <div class="flex w-full items-center gap-1.5">
            <Input type="text" id="search" placeholder="Search" v-model="word" class="bg-[#EAEAEA]" />
        </div>
        <div>
            <Popover>
                <PopoverTrigger as-child>
                    <Button variant="outline">
                        <CalendarIcon class="mr-2 h-4 w-4" />
                        <template v-if="value.start">
                            <template v-if="value.end">
                                {{ df.format(value.start.toDate(getLocalTimeZone())) }} - {{
                                    df.format(value.end.toDate(getLocalTimeZone())) }}
                            </template>

                            <template v-else>
                                {{ df.format(value.start.toDate(getLocalTimeZone())) }}
                            </template>
                        </template>
                        <template v-else>
                            Pick a date
                        </template>
                    </Button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">
                    <RangeCalendar v-model="value" initial-focus :number-of-months="2"
                        @update:start-value="(startDate) => value.start = startDate" />
                </PopoverContent>
            </Popover>
        </div>
        <Button type="submit" @click="postSeatch()">
            Search
        </Button>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue';
import { Input } from '@/components/ui/input';
import { useStorage } from '~/state';
import { type Organization } from '../formReports/index.vue';
import { type Ref } from 'vue'
import {
    CalendarDate,
    DateFormatter,
    getLocalTimeZone,
} from '@internationalized/date';
import { Calendar as CalendarIcon } from 'lucide-vue-next';
import type { DateRange } from 'radix-vue';
import { RangeCalendar } from '@/components/ui/range-calendar';
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';


const df = new DateFormatter('en-US', {
    dateStyle: 'medium',
})

const state = useStorage();
const listOrg = ref<Organization[]>([]);
const loading = ref<boolean>(true);
const selectedValue = ref<string>('');
const word = ref<string>('');

const postFilter = () => {
    console.log('Selected value:', selectedValue.value);
    if (selectedValue.value !== '') {
        state.filterReport(selectedValue.value);
    }
};

const postSeatch = () => {
    if (word.value !== '') {
        state.search(word.value);
    }
};

const search = (text: string) => {
    if (text.trim() === '') {
        console.log('Input empty!')
    }
    else {
        state.searchDescription(text);
    }
}
const currentDate = new Date();

const value = ref({
    start: new CalendarDate(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
    end: new CalendarDate(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).add({ days: 20 }),
}) as Ref<DateRange>

watchEffect(() => {
    const allOrganization = state.$state.AllOrganization;
    if (allOrganization) {
        listOrg.value = allOrganization.List;
        loading.value = allOrganization.loading;
    }
});

onMounted(() => {
    state.getAllOrganization();
});
</script>
