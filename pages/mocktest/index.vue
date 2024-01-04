<template>
  <div>
    <MockTestPageBanner />
    <MockTestPageLowerBanner />
    <MockTestPageYouStarted />
    <MockTestPageFeatureTest />
    <MockTestPageLatestTest />
    <HomePageHelpHand />
    <CategoryYouKnow />
  </div>
</template>

<script>
import { Storage } from '@capacitor/storage';
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

import { mapState, mapActions, mapMutations } from 'vuex';
export default {
  layout: 'homePageLayout',

  middleware: ['authenticated'],
  components: { VueSlickCarousel },

  head() {
    return {
      title: `Mock Test Hub: Latest & Greatest for Your Success!`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Unleash success with our top-rated mock tests. Stay updated with the latest and featured simulations. Your ultimate preparation journey begins now!`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `Mock Test Hub: Latest & Greatest for Your Success!`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `Unleash success with our top-rated mock tests. Stay updated with the latest and featured simulations. Your ultimate preparation journey begins now!`,
        },
        {
          name: 'keywords',
          content: `Mock Test Hub: Latest & Greatest for Your Success!, Mockcertified App`,
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
          content: `Mock Test Hub: Latest & Greatest for Your Success!`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `Unleash success with our top-rated mock tests. Stay updated with the latest and featured simulations. Your ultimate preparation journey begins now!`,
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

  data() {
    return {
      // hasRunBefore: false,

      isFetched: false,

      screenWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
    };
  },

  created() {
    // Check if window is defined before adding the event listener
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleResize);
    }
  },
  destroyed() {
    // Check if window is defined before removing the event listener
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
    }
  },

  computed: {
    ...mapState(['isLoading', 'isLoaderHidden', 'allCreatedTests', 'platform']),
    ...mapState('auth', ['user']),
    ...mapState('testManagement', ['featuredTests', 'recentlyAddedTests']),
  },

  async mounted() {
    // if (!this.user) {
    //   this.$router.push('/');
    // }
    this.setIsLoaderHidden(true);

    if (!this.featuredTests.length) {
      await this.getAllFeaturedTest();
    }

    if (!this.recentlyAddedTests.length) {
      await this.getRecentlyAddedTests();
    }

    this.setIsLoaderHidden(false);

    this.isFetched = true;
  },

  methods: {
    ...mapActions('testManagement', ['getAllFeaturedTest', 'getRecentlyAddedTests']),
    ...mapMutations(['setIsLoaderHidden']),

    formatPrice(price) {
      return parseFloat(price).toFixed(2);
    },

    totalMarks(questionsArr) {
      let totalMarks = 0;
      questionsArr.map((ques) => {
        totalMarks += ques.marks;
      });
      return totalMarks;
    },

    getDate(getdatetime) {
      var dateStr = new Date(getdatetime);
      return dateStr.toLocaleDateString();
    },

    handleResize() {
      // Check if window is defined before accessing its properties
      if (typeof window !== 'undefined') {
        this.screenWidth = window.innerWidth;
      }
    },
  },
};
</script>
