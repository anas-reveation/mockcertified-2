<template>
  <div class="container mt-5 px-4">
    <div v-if="isLoaderHidden">
      <AnimatedPlaceholder width="150px" height="16px" />
      <br />
      <AnimatedPlaceholder width="250px" height="16px" />
      <br />
      <AnimatedPlaceholder width="250px" height="16px" />
      <br />
      <TestCardsSkeleton />
    </div>

    <div v-else>
      <h1 v-if="FAQ" class="mb-4 font_size_36">FAQ</h1>
      <div class="TC_and_PP_class" v-html="FAQ"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { Browser } from '@capacitor/browser';

export default {
  head() {
    return {
      title: 'FAQ',
    };
  },

  computed: {
    ...mapState(['isLoaderHidden', 'FAQ']),
  },

  async mounted() {
    this.setIsLoaderHidden(true);
    if (!this.FAQ) {
      await this.getTC_and_PP();
    }
    this.setIsLoaderHidden(false);
  },

  methods: {
    ...mapActions(['getTC_and_PP']),
    ...mapMutations(['setIsLoaderHidden']),

    async newWindowsOpen(url) {
      await Browser.open({ url: url });
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/auth.scss';

.TC_and_PP_class :deep() {
  h2 {
    font-size: 24px;
    font-weight: bold;
  }

  span {
    font-weight: bolder;
  }

  p {
    font-size: 16px;
  }

  ul {
    padding-left: 12px;
  }

  li {
    font-size: 16px;
  }

  a {
    color: blue;
  }

  .word_wrap {
    word-wrap: break-word;
  }
}
</style>
