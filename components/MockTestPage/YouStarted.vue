<template>
  <div class="container mb-5">
    <h2
      class="text-black font-size-24 font-size-md-28 font-size-lg-44 fw-bolder text-center font_family_poppins_bold mb-5"
    >
      Mock Test Programs To<span class="text-primary"> Get You Started</span>
    </h2>
    <!-- <div class="row mb-4 border_bottom mx-3">
      <div
        class="col-12 col-md-8 col-lg-5 p-0 d-flex align-items-center font-size-14 font-size-lg-16 font_family_poppins_bold"
      >
        <p>Most Popular</p>
        <p class="mx-3">New</p>
        <p>Trending</p>
      </div>
    </div> -->

    <div v-if="isLoaderHidden && !this.allApprovedTests.length" class="row gy-3">
      <div v-for="i in 4" :key="i" class="col-12 col-md-6 col-lg-3" data-aos="zoom-in">
        <AnimatedPlaceholder class="w-100" height="200px" />
      </div>
    </div>
    <div
      v-if="this.allApprovedTests.length"
      :id="carouselId"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div
          v-for="(chunk, index) in startedTestChunks"
          :key="index"
          class="carousel-item"
          :class="{ active: index === 0 }"
        >
          <div class="container">
            <div class="row g-3">
              <div
                v-for="(card, cardIndex) in chunk"
                :key="cardIndex"
                class="col-12 col-md-6 col-xl-3"
              >
                <div class="card">
                  <!-- Card content goes here using the 'card' object -->
                  <img
                    :src="`/_nuxt/assets/images/test_${((cardIndex + index * 4) % 7) + 0}.svg`"
                    :alt="'card_' + cardIndex"
                    class="w-100"
                  />
                  <div class="p-3">
                    <p class="fw-bolder font_family_poppins_bold font-size-18">
                      {{ card.title }}
                    </p>
                    <p class="font-size-14 mb-2 font_family_poppins_light">
                      {{ card.description }}
                    </p>
                    <img src="@/assets/images/card_star.svg" alt="card_star" class="card_star" />
                    <NuxtLink :to="`/${card.slug}`">
                      <p
                        class="fw-bolder font-size-16 text-primary text-decoration-underline pt-5 mb-0"
                      >
                        Explore
                      </p>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-indicators">
        <button
          v-for="i in totalSlides"
          type="button"
          :data-bs-target="`#${carouselId}`"
          :data-bs-slide-to="i - 1"
          :class="{ active: i === 2 }"
          :aria-label="'Slide ' + i - 1"
          :aria-current="{ true: i == 2 }"
        >
          <div class="carousel-indicator-disc"></div>
        </button>
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
      carouselId: 'carouselExampleControlsLatest_1',
    };
  },

  computed: {
    ...mapState(['isLoading', 'isLoaderHidden', 'allCreatedTests', 'platform']),
    ...mapState('auth', ['user']),
    ...mapState('testManagement', ['allApprovedTests']),
    startedTestChunks() {
      const chunkSize = 4;
      const totalChunks = Math.ceil(this.allApprovedTests.length / chunkSize);
      return Array.from({ length: totalChunks }, (_, index) => {
        const startIndex = index * chunkSize;
        const endIndex = startIndex + chunkSize;
        return this.allApprovedTests.slice(startIndex, endIndex);
      });
    },
    totalSlides() {
      return this.startedTestChunks.length;
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
.border_bottom {
  border-bottom: 2px solid #c4c4c4;
}
</style>
