<template>
  <div>
    <div
      class="vw-100 vh-100 d-flex justify-content-center align-items-center position-absolute z_index"
      v-if="isLoading"
    >
      <div class="spinner-border" role="status"></div>
    </div>

    <Navbar class="z_index2" />

    <div @click="removeClass">
      <Nuxt class="margin_bottom px-4" />
    </div>

    <div class="fixed-bottom footer_height" @click="removeClass">
      <div v-if="!ishiddenAlexa" class="position-relative">
        <div class="position-absolute bottom-0 end-0 mb-2 alexa_hover">
          <span class="tooltiptext border border-dark rounded-pill text-dark p-1">
            Connect to Alexa
          </span>
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
    ...mapState(['isLoading']),
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
    removeClass() {
      try {
        this.$root.$children[1].$children[0].$refs['navbarDiv'].classList.remove('show');
      } catch (_err) {}
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
  z-index: 999;
}

/* Proceed to checkout button is related that is in "cart" page */
.footer_height {
  height: 80px;
}

.margin_bottom {
  margin-bottom: 80px;
}
/* Proceed to checkout button is related that is in "cart" page */

.tooltiptext {
  visibility: hidden;
  padding: 5px 0;

  /* Position the tooltip */
  /* position: absolute;
  z-index: 1;
  top: -5px;
  right: 105%; */
}

.alexa_hover:hover .tooltiptext {
  visibility: visible;
}
</style>
