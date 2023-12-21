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
