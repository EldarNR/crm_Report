<template>
    <div>
        <a v-if="props.fileUid"
            :href="`https://ustowvbylqottnlzxouw.supabase.co/storage/v1/object/public/reports_file/${props.fileUid}`">
            Ссылка
        </a>

        <span v-else>Материал не прикреплен</span>

        <div>
            <p class="p-2">{{ props.description }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Header {
    fileUid?: string
    description: string
}

const props = defineProps<Header>()
</script>
