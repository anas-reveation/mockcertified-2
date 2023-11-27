<template>
  <div class="mb-5">
    <h2
      class="text-black font-size-24 font-size-md-28 font-size-lg-44 fw-bolder text-center font_family_poppins_bold mb-5"
    >
      Our Latest Mock <span class="text-primary"> Test Programs</span>
    </h2>
    <div :id="carouselId" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div
          v-for="(slide, index) in totalSlides"
          :key="index"
          class="carousel-item"
          :class="{ active: index === 0 }"
        >
          <div class="container">
            <div class="row g-3">
              <div
                v-for="(card, cardIndex) in getCardsForSlide(index)"
                :key="cardIndex"
                class="col-12"
              >
                <div class="row justify-content-between p-4 boredr_bottom">
                  <div class="col-12 col-lg-4 mb-3 mb-lg-0">
                    <img src="@/assets/images/latest_card.svg" alt="card_1" class="w-100 h-100" />
                  </div>
                  <div
                    class="col-12 col-lg-8 d-flex flex-column justify-content-between ps-3 ps-lg-4 mb-4 mb-lg-0"
                  >
                    <div class="mb-4 mb-xl-0">
                      <p
                        class="fw-bolder font_family_poppins_bold font-size-18 font-size-md-20 font-size-lg-22"
                      >
                        Lorem ipsum dolor sit amet
                      </p>
                      <p class="font-size-14">
                        Lorum dolor sit amet, consectetur uadipelioeiusmpocididunt ut labo ostrud
                        exercitation consequat.ipsum dolamet, secteturempor uq Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo
                      </p>
                      <img src="@/assets/images/card_star.svg" alt="card_star" class="card_star" />
                    </div>
                    <p class="fw-bolder font_family_poppins_bold font-size-16 mb-0">$80.00</p>
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
            :class="{ active: i === 2 }"
            :aria-label="'Slide ' + i - 1"
            :aria-current="{ true: i == 2 }"
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
export default {
  data() {
    return {
      cards: [], // To store the API response
      carouselId: 'carouselExampleControlsLatest', // ID for the carousel
    };
  },
  computed: {
    totalSlides() {
      // Calculate the total number of slides based on the number of cards
      return Math.ceil(this.cards.length / 5);
    },
  },
  methods: {
    getCardsForSlide(slideIndex) {
      // Calculate the start and end index for cards in the current slide
      const startIndex = slideIndex * 5;
      const endIndex = startIndex + 5;
      // Return the subset of cards for the current slide
      return this.cards.slice(startIndex, endIndex);
    },
  },
  mounted() {
    // Fetch data from the API and update the 'cards' array
    // Replace the following line with your actual API call
    this.cards = Array.from({ length: 16 }, (_, index) => ({
      title: `Card ${index + 1}`,
      description: `Lorum dolor sit amet, consectetur uadipelioeiusmpocididunt ut labo
                      ipsum dolamet, secteturempor uq `,
      image: `~assets/images/latest_card.svg`,
    }));

    // Add an event listener to update screenWidth on window resize
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

.boredr_bottom {
  border-bottom: 1px solid #c4c4c4;
}
</style>
