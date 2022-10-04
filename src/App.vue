<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style>
  html.dark{
    color-scheme: dark
  }
  /* body{
    background:rgba(248, 251, 255, 0.8) ;
  } */
</style>
