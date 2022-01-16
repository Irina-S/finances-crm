<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from '@/utils/messages'

export default {
  computed: {
    error() {
      return this.$store.getters.error
    },
  },
  watch: {
    error(fbError) {
      const errorCode = fbError.code
      this.$error(messages[errorCode])
    },
  },
}
</script>

<style></style>
