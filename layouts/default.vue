<template>
  <div>
    <div
      class="vw-100 vh-100 d-flex justify-content-center align-items-center position-absolute"
      v-if="isLoading"
    >
      <div class="spinner-border" role="status"></div>
    </div>
    <Navbar />
    <Nuxt class="margin_bottom" />
    <FooterNavbar class="fixed-bottom footer_height" />
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

.footer_height {
  height: 70px;
}

.margin_bottom {
  margin-bottom: 70px;
}
</style>
