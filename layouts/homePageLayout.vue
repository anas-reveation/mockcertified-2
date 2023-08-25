<template>
  <div>
    <div
      class="vw-100 vh-100 d-flex justify-content-center align-items-center position-absolute z_index"
      v-if="isLoading && !isLoaderHidden"
    >
    </div>

    <div>
      <Nuxt class="overflow-hidden" />
    </div>

    <div class="fixed-bottom">
      <div v-if="!ishiddenAlexa" class="position-relative">
        <div class="position-absolute bottom-0 end-0 mb-5 alexa_container">
          <a @click="openAlexa" href="#">
            <img src="@/assets/images/alexa.svg" alt="alexa-icon" class="alexa_icon" />
          </a>
          <a @click="openAlexa" href="#">
            <span class="border border-dark bg-light rounded-pill text-dark alexa_text">
              Connect to Alexa
            </span>
          </a>
        </div>
      </div>
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
    ...mapState(['isLoading', 'isLoaderHidden']),
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
    async openAlexa() {
      await Browser.open({ url: this.alexaSkillLink });
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

a{
  text-decoration: none !important;
}
.z_index {
  z-index: 1000;
}
.alexa_icon {
  width: 100%;
  height: 100%;
  margin-top: 10px;
}

.alexa_container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
  gap: 10px;
}
.alexa_text {
  padding: 0.5rem 1rem;
  font-size: 0.7rem;
  transition: all 0.3 ease-in-out;
}

@include media-breakpoint-down(md) {
  .alexa_icon {
    width: 50px;
    height: 50px;
  }
  .alexa_text {
    padding: 0.5rem;
    font-size: 0.4rem;
  }
}
</style>