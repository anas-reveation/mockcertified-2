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
      <h1 v-if="privacyPolicy" class="mb-4 font_size_36">Privacy Policy</h1>
      <div class="TC_and_PP_class" v-html="privacyPolicy"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { Browser } from '@capacitor/browser';

export default {
  head() {
    return {
      title: 'Privacy Policy',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'This Privacy Policy for the Mockcertified App explains how and why we may collect, store, use and/or share your information when you use our services.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Privacy Policy - Mockcertified App',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'This Privacy Policy for the Mockcertified App explains how and why we may collect, store, use and/or share your information when you use our services.',
        },
        {
          name: 'keywords',
          content: 'Privacy Policy - Mockcertified App, 13756700 Canada Inc. ',
        },

        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `https://${process.env.DOMAIN}${require('~/assets/images/logo_with_name.svg')}`,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://${process.env.DOMAIN}/${this.$router.currentRoute.name}`,
        },

        // Twitter Meta Tags
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Privacy Policy - Mockcertified App',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'This Privacy Policy for the Mockcertified App explains how and why we may collect, store, use and/or share your information when you use our services.',
        },

        {
          hid: 'twitter:domain',
          property: 'twitter:domain',
          content: process.env.DOMAIN,
        },
        {
          hid: 'twitter:url',
          property: 'twitter:url',
          content: `https://${process.env.DOMAIN}/${this.$router.currentRoute.name}`,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: `https://${process.env.DOMAIN}${require('~/assets/images/logo_with_name.svg')}`,
        },
      ],
    };
  },

  computed: {
    ...mapState(['isLoaderHidden', 'privacyPolicy']),
  },

  async mounted() {
    this.setIsLoaderHidden(true);
    if (!this.privacyPolicy) {
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
