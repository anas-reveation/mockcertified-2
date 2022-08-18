<template>
  <div>
    <div
      class="vw-100 vh-100 d-flex justify-content-center align-items-center position-absolute z_index"
      v-if="isLoading"
    >
      <div class="spinner-border" role="status"></div>
    </div>
    <Navbar />
    <Nuxt class="margin_bottom px-4" />

    <div class="fixed-bottom footer_height">
      <div v-if="!ishiddenAlexa" class="position-relative">
        <div class="position-absolute bottom-0 end-0 mb-2">
          <img src="@/assets/images/alexa.svg" alt="alexa-icon" />
        </div>
      </div>
      <FooterNavbar />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      ishiddenAlexa: false,
    };
  },

  computed: {
    ...mapState(['user', 'isLoading']),
  },

  watch: {
    '$route.path': {
      handler: function (path) {
        path.match(/\/test\/*/g + /\/start-test\/*/g)
          ? (this.ishiddenAlexa = true)
          : (this.ishiddenAlexa = false);
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style>
.spinner-bg {
  background: #656565 !important;
}

.z_index {
  z-index: 1000;
}

.z_index2 {
  z-index: 1020;
}

/* Proceed to checkout button is related that is in "cart" page */
.footer_height {
  height: 80px;
}

.margin_bottom {
  margin-bottom: 80px;
}
/* Proceed to checkout button is related that is in "cart" page */
</style>
