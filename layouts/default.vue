<template>
  <div>
    <div
      class="vw-100 vh-100 d-flex justify-content-center align-items-center position-absolute z_index"
      v-if="isLoading && !isLoaderHidden"
    >
      <div class="spinner-border" role="status"></div>
    </div>

    <Navbar class="z_index2" />

    <!-- <div @click="removeClass" :class="isSideNavbarVisible && 'sideNavbarOpen'">
      <Nuxt class="margin_bottom px-4" />
    </div> -->

    <div @click="removeClass">
      <Nuxt class="margin_bottom px-4" />
    </div>

    <div class="fixed-bottom" @click="removeClass">
      <div v-if="!ishiddenAlexa" class="position-relative">
        <div class="position-absolute hover-alex bottom-0 end-0 mb-5">
          <a @click="openAlexa" href="#">
            <img src="@/assets/images/alexa.svg" alt="alexa-icon" class="alexa_icon alexa_hover" />
          </a>
          <a @click="openAlexa" class="d-none d-md-block" href="#">
            <span class="border border-dark bg-light rounded-pill text-dark hide_text">
              Connect to Alexa
            </span>
          </a>
        </div>
      </div>
      <FooterDesktop class="d-none d-lg-block pt-0" />
      <FooterNavbar class="d-lg-none" />
    </div>
  </div>
</template>

<script>
import { Browser } from '@capacitor/browser';
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      ishiddenAlexa: false,
      alexaSkillLink: `https://alexa-skills.amazon.com/apis/custom/skills/${process.env.ALEXA_SKILL_ID}/launch`,
    };
  },

  computed: {
    ...mapState(['isLoading', 'isLoaderHidden', 'isSideNavbarVisible']),
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

    async openAlexa() {
      await Browser.open({ url: this.alexaSkillLink });
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

@include media-breakpoint-down(lg) {
  .alexa_icon {
    width: 50px;
    height: 50px;
  }
  .margin_bottom {
    margin-bottom: 80px !important;
  }
}
@include media-breakpoint-up(lg) {
  .fixed-bottom {
    position: static !important;
  }
  .hover-alex {
    position: fixed !important;
  }
}

.margin_bottom {
  margin-bottom: 28px;
}
/* Proceed to checkout button is related that is in "cart" page */

.hide_text {
  display: none;
}
.hover-alex:hover .hide_text {
  display: block;
  position: absolute;
  margin-left: -9.4em;
  margin-top: -3em;
  padding: 8px 7px 5px 9px;
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
