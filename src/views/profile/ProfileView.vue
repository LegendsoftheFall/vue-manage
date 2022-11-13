<template>
    <div class="relative">
        <!-- Header -->
        <GlobalHeader />
    </div>
    <div class=" dark:bg-black absolute w-full h-max border-t dark:border-gray-900">
        <!-- Content -->
        <ProfileContent/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProfileContent from '@/components/content/ProfileContent.vue'
import GlobalHeader from '@/components/header/GlobalHeader.vue'

export default defineComponent({
  name: 'ProfileView',
  components: { GlobalHeader, ProfileContent }
})
</script>
