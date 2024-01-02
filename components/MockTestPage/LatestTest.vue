<template>
  <div class="container mb-5">
    <h2
      class="text-black font-size-24 font-size-md-28 font-size-lg-44 fw-bolder text-center font_family_poppins_bold mb-5"
    >
      Our Latest Mock <span class="text-primary">Test Programs</span>
    </h2>
    <div :id="carouselId" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div v-if="isLoaderHidden && !this.allApprovedTests.length" class="row gy-3">
          <div
            v-for="(i, index) in 5"
            :key="i"
            class="col-12"
            data-aos="zoom-in"
            :class="{ 'carousel-item': true, active: index === 0 }"
          >
            <AnimatedPlaceholder class="w-100 my-3" height="200px" />
          </div>
        </div>
        <div v-if="!isLoaderHidden && this.allApprovedTests.length">
          <div
            v-for="(chunk, index) in featuredTestChunks"
            :key="index"
            class="carousel-item"
            :class="{ active: index === 0 }"
          >
            <div class="container">
              <div class="row g-3">
                <div v-for="(card, cardIndex) in chunk" :key="cardIndex" class="col-12">
                  <div class="row justify-content-between py-4 px-0 p-lg-4 border_bottom">
                    <div class="col-12 col-lg-4 mb-3 mb-lg-0">
                      <img
                        :src="
                          require(`@/assets/images/test_${((cardIndex + index * 4) % 7) + 0}.svg`)
                        "
                        alt="card_1"
                        class="w-100 h-100"
                      />
                    </div>
                    <div
                      class="col-12 col-lg-8 d-flex flex-column justify-content-between ps-3 ps-lg-4 mb-4 mb-lg-0"
                    >
                      <div class="mb-4 mb-xl-0">
                        <p
                          class="fw-bolder font_family_poppins_bold font-size-18 font-size-md-20 font-size-lg-22"
                        >
                          {{ card.title }}
                        </p>
                        <p
                          class="font-size-14 description_lines"
                          v-html="card.description"
                          ref="container"
                        ></p>
                        <img
                          src="@/assets/images/card_star.svg"
                          alt="card_star"
                          class="card_star"
                        />
                      </div>
                      <p class="fw-bolder font_family_poppins_bold font-size-16 mb-0">
                        {{ formatPrice(card.price) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="carousel-indicators">
        <div>
          <button
            class="icon_slide"
            type="button"
            data-bs-target="#carouselExampleControlsLatest"
            data-bs-slide="prev"
          >
            <img src="~assets/images/left_arrow.svg" alt="preview_icon" />
            <span class="visually-hidden">Previous</span>
          </button>

          <button
            v-for="i in totalSlides"
            type="button"
            :data-bs-target="`#${carouselId}`"
            :data-bs-slide-to="i - 1"
            :class="{ active: i === 1 }"
            :aria-label="'Slide ' + i"
            :aria-current="{ true: i === 1 }"
          >
            <div class="carousel-indicator-num text-center">{{ i }}</div>
          </button>

          <button
            class="icon_slide"
            type="button"
            data-bs-target="#carouselExampleControlsLatest"
            data-bs-slide="next"
          >
            <img src="~assets/images/right_arrow.svg" alt="next_icon" />
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
      carouselId: 'carouselExampleControlsLatest',
    };
  },

  computed: {
    ...mapState(['isLoading', 'isLoaderHidden', 'allCreatedTests', 'platform']),
    ...mapState('auth', ['user']),
    ...mapState('testManagement', ['allApprovedTests']),
    featuredTestChunks() {
      const chunkSize = 10;
      const totalChunks = Math.ceil(this.allApprovedTests.length / chunkSize);
      return Array.from({ length: totalChunks }, (_, index) => {
        const startIndex = index * chunkSize;
        const endIndex = startIndex + chunkSize;
        return this.allApprovedTests.slice(startIndex, endIndex);
      });
    },
    totalSlides() {
      return this.featuredTestChunks.length;
    },
  },

  async mounted() {
    this.setIsLoaderHidden(true);

    if (!this.allApprovedTests.length) {
      await this.getAllApprovedTests();
    }

    this.setIsLoaderHidden(false);
  },

  methods: {
    ...mapActions('testManagement', ['getAllApprovedTests']),
    ...mapMutations(['setIsLoaderHidden']),
    formatPrice(price) {
      return parseFloat(price).toFixed(2);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.card {
  box-shadow: 6px 6px 10px 0 rgba(0, 0, 0, 0.09);
}
.card_star {
  width: 100px;
}
.carousel-indicators {
  padding-top: 20px;
  position: relative;
  box-sizing: none;
}
.carousel-indicators [data-bs-target] {
  text-indent: 0;
}

.border_bottom {
  border-bottom: 2px solid #c4c4c4;
}

.description_lines {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* Number of lines to show */
  -webkit-box-orient: vertical;
}
</style>
