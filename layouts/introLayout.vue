<template>
  <div>
    <div
      class="vw-100 vh-100 d-flex justify-content-center align-items-center position-absolute z_index"
      v-if="isLoading"
    >
      <div class="spinner-border" role="status"></div>
    </div>
    <Nuxt class="px-4" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['user', 'isLoading']),
  },
};
</script>
