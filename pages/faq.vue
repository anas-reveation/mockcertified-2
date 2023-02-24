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
      title: 'FAQ - Mock Test',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Mockcertified provides you with the resources you need to ace your certification exams. Check out our FAQ section for all the answers to your questions. ',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'FAQ - Mock Test - Mockcertified App',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Mockcertified provides you with the resources you need to ace your certification exams. Check out our FAQ section for all the answers to your questions.',
        },
        {
          name: 'keywords',
          content:
            'Frequently Asked Questions, What is Mock Test, FAQ, Exam Frequently Asked Questions, Mock exam questions and answers, Mock Exams FAQs',
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
          content: 'FAQ - Mock Test - Mockcertified App',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Mockcertified provides you with the resources you need to ace your certification exams. Check out our FAQ section for all the answers to your questions.',
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
