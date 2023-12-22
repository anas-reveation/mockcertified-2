<template>
  <div class="container my-5">
    <h2
      class="text-black font-size-24 font-size-md-28 font-size-lg-44 fw-bolder text-center font_family_poppins_bold mb-5"
    >
      Featured <span class="text-primary">Tests</span>
    </h2>

    <div class="">
      <div class="row align-items-center">
        <div
          v-if="screenWidth > 767"
          class="col-1 d-flex align-items-center justify-content-center"
        >
          <button
            class="icon_slide"
            type="button"
            data-bs-target="#carouselExampleControlsFeature"
            data-bs-slide="prev"
          >
            <img src="~assets/images/preview_icon.svg" alt="preview_icon" />
            <span class="visually-hidden">Previous</span>
          </button>
        </div>
        <div class="col-12 col-md-10 px-3 bg_lightgreen">
          <div id="carouselExampleControlsFeature" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div v-if="isLoaderHidden && !this.featuredTests.length" class="row gy-3">
                <div
                  v-for="(i, index) in 4"
                  :key="i"
                  class="col-12"
                  data-aos="zoom-in"
                  :class="{ 'carousel-item': true, active: index === 0 }"
                >
                  <AnimatedPlaceholder class="w-100 my-3" height="200px" />
                </div>
              </div>
              <div v-if="!isLoaderHidden && this.featuredTests.length">
                <div
                  v-for="(featuredTest, index) in featuredTests"
                  :key="index"
                  :class="{ 'carousel-item': true, active: index === 0 }"
                >
                  <div class="row justify-content-between p-4">
                    <div class="col-12 col-lg-5 order-2 order-lg-0">
                      <img
                        :src="`/_nuxt/assets/images/test_${index}.svg`"
                        alt="card_1"
                        class="w-100 h-100"
                      />
                    </div>
                    <div
                      class="col-12 col-lg-7 d-flex flex-column justify-content-between ps-3 ps-lg-4 mb-4 mb-lg-0"
                    >
                      <div class="mb-4 mb-xl-0">
                        <p
                          class="fw-bolder font_family_poppins_bold font-size-18 font-size-md-20 font-size-lg-22"
                        >
                          {{ featuredTest.title }}
                        </p>
                        <p class="font-size-14">{{ featuredTest.description }}</p>
                        <img
                          src="@/assets/images/card_star.svg"
                          alt="card_star"
                          class="card_star"
                        />
                      </div>
                      <p class="fw-bolder font_family_poppins_bold font-size-16 mb-0">
                        ${{ formatPrice(featuredTest.price) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="screenWidth < 767" class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleControlsFeature"
                :data-bs-slide-to="index"
                :class="{ active: index === 0 }"
                aria-current="true"
                :aria-label="'Slide ' + (index + 1)"
                v-for="(i, index) in 3"
                :key="index"
              ></button>
            </div>
          </div>
        </div>
        <div
          v-if="screenWidth > 767"
          class="col-1 d-flex align-items-center justify-content-center"
        >
          <button
            class="icon_slide"
            type="button"
            data-bs-target="#carouselExampleControlsFeature"
            data-bs-slide="next"
          >
            <img src="~assets/images/next_icon.svg" alt="next_icon" />
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Storage } from '@capacitor/storage';

import { mapState, mapActions, mapMutations } from 'vuex';
export default {
  middleware: ['authenticated'],

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

<style scoped lang="scss">
.bg_lightgreen {
  background-color: rgba(240, 247, 255, 1);
}
.circle-container {
  border: 2px dashed blue;
  border-radius: 50%;
  overflow: hidden;
}

.circle-image {
  width: 100%; /* Make the image fill the container */
  height: auto; /* Maintain the aspect ratio */
  border-radius: 50%; /* Ensure the image is circular */
}
.icon_slide {
  background: transparent;
  border: none;
}

.carousel-indicators {
  padding-top: 20px;
  position: relative;
}

.carousel-indicators button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #6c757d; /* Light grey color for inactive indicators */
  background-color: transparent;
  margin: 0 5px;
  cursor: pointer;
}

.carousel-indicators .active {
  background-color: #343a40; /* Dark grey color for active indicator */
}
</style>
