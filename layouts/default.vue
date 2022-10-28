<template>
  <div>
    <div
      class="vw-100 vh-100 d-flex justify-content-center align-items-center position-absolute z_index"
      v-if="isLoading"
    >
      <div class="spinner-border" role="status"></div>
    </div>

    <Navbar class="z_index2" />

    <!-- <div @click="removeClass" :class="isSideNavbarVisible && 'sideNavbarOpen'">
      <Nuxt class="margin_bottom px-4" />
    </div> -->

    <div>
      <Nuxt class="margin_bottom px-4" />
    </div>

    <div class="fixed-bottom footer_height" @click="removeClass">
      <div v-if="!ishiddenAlexa" class="position-relative">
        <div class="position-absolute bottom-0 end-0 mb-2">
          <img src="@/assets/images/alexa.svg" alt="alexa-icon" class="alexa_hover" />
          <span class="border border-dark rounded-pill text-dark p-1 hide_text">
            Connect to Alexa
          </span>
        </div>
      </div>
      <FooterNavbar class="d-sm-none" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      ishiddenAlexa: false,
    };
  },

  computed: {
    ...mapState(['isLoading', 'isSideNavbarVisible']),
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

  methods: {
    // ...mapMutations(['setIsSideNavbarVisible']),

    removeClass() {
      try {
        // this.setIsSideNavbarVisible(false);
        this.$root.$children[1].$children[0].$refs['navbarDiv'].classList.remove('show');
      } catch (_err) {}
    },
  },
};
</script>

<style lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.spinner-bg {
  background: #656565 !important;
}

.z_index {
  z-index: 1000;
}

.z_index2 {
  z-index: 999;
}

// .sideNavbarOpen {
//   margin-right: 250px;
// }

/* Proceed to checkout button is related that is in "cart" page */

@include media-breakpoint-down(sm) {
  .footer_height {
    height: 80px;
  }
}

.margin_bottom {
  margin-bottom: 80px;
}
/* Proceed to checkout button is related that is in "cart" page */

.hide_text {
  display: none;
}

.alexa_hover:hover + .hide_text {
  display: inline;
  position: absolute;
  z-index: 1;
  top: 10px;
  right: 105%;
  width: 180px;
  background: white;
}
</style>
