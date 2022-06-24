<template>
  <div class="">
    <div
      class="vw-100 vh-100 d-flex justify-content-center align-items-center position-absolute"
      v-if="isLoading === true"
    >
      <div class="spinner-border" role="status"></div>
    </div>
    <Navbar />
    <Nuxt />
    <FooterNavbar />
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
<style>
.spinner-bg {
  background: #656565 !important;
}
</style>
