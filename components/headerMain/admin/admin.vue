<template>
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger as-child>

                <Avatar class=" bg-neutral-200">
                    <SVG :title="'alient'" :color="'green'"
                        :d="'M12,3C16.97,3 21,6.58 21,11C21,15.42 15,21 12,21C9,21 3,15.42 3,11C3,6.58 7.03,3 12,3M10.31,10.93C9.29,9.29 7.47,8.58 6.25,9.34C5.03,10.1 4.87,12.05 5.89,13.69C6.92,15.33 8.74,16.04 9.96,15.28C11.18,14.5 11.33,12.57 10.31,10.93M13.69,10.93C12.67,12.57 12.82,14.5 14.04,15.28C15.26,16.04 17.08,15.33 18.11,13.69C19.13,12.05 18.97,10.1 17.75,9.34C16.53,8.58 14.71,9.29 13.69,10.93M12,17.75C10,17.75 9.5,17 9.5,17C9.5,17.03 10,19 12,19C14,19 14.5,17 14.5,17C14.5,17 14,17.75 12,17.75Z'"></SVG>
                </Avatar>


            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-56 ">
                <DropdownMenuLabel>Admin</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem class="bg-red-400 text-white" @click="signOut">
                    Sign out
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
</template>

<script lang="ts" setup>
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import SVG from '~/components/ui/svg/SVG.vue'
import { useStorage } from '~/state';
import { supabase } from '~/state/supabase/supabase';


const user = useSupabaseUser();
const router = useRouter();
const state = useStorage();


const signOut = async () => {
    await supabase.auth.signOut()
    navigateTo('/admin')
}

</script>