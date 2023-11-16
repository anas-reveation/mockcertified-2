<template>
  <div class="bg-lightGreen py-5">
    <div class="container text-center">
      <div class="d-flex flex-column align-items-center justify-content-center">
        <h2
          class="font-size-44 fw-bolder font-size-24 font-size-md-28 font-size-lg-44 font_family_poppins_bold"
        >
          Our Top - Selling Tests
        </h2>
        <p
          class="fw-light font-size-10 font-size-md-12 font-size-lg-14 font_family_poppins_light text-center my-3 w_100"
        >
          ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt iLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm
        </p>
      </div>

      <div class="row py-5 g-5 align-items-center">
        <div class="col-12 col-md-6 col-lg-4">
          <div class="card_top">
            <div class="card-content">
              <img src="@/assets/images/card_1.svg" alt="card_1" class="w-100" />
              <div class="p-3 d-flex flex-column justify-content-start">
                <p class="fw-bolder text-start font_family_poppins_bold">Blockchain</p>
                <p class="font-size-14 text-start font_family_poppins_light">
                  Lorem ipsum dolor sit amet, consectetur uadipelioeiusmod tempor incididunt ut labo
                  ipsum dolor sit amet, consecteturempor uq
                </p>
                <img src="@/assets/images/card_star.svg" alt="card_star" class="card_star" />
                <p
                  class="fw-bolder text-start font-size-16 text-primary text-decoration-underline pt-5"
                >
                  Explore
                </p>
              </div>
              <!-- Card content goes here -->
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <div class="card_top">
            <div class="card-content_2">
              <img src="@/assets/images/card_1.svg" alt="card_1" class="w-100" />
              <div class="p-3 d-flex flex-column justify-content-start bg-white">
                <p class="fw-bolder text-start font_family_poppins_bold">Blockchain</p>
                <p class="font-size-14 text-start font_family_poppins_light">
                  Lorem ipsum dolor sit amet, consectetur uadipelioeiusmod tempor incididunt ut labo
                  ipsum dolor sit amet, consecteturempor uq
                </p>
                <img src="@/assets/images/card_star.svg" alt="card_star" class="card_star" />
                <p
                  class="fw-bolder text-start font-size-16 text-primary text-decoration-underline pt-5"
                >
                  Explore
                </p>
              </div>
              <!-- Card content goes here -->
            </div>
          </div>
        </div>
        <div v-if="screenWidth > 991" class="col-12 col-md-6 col-lg-4">
          <div class="card_top">
            <div class="card-content_3">
              <img src="@/assets/images/card_1.svg" alt="card_1" class="w-100" />
              <div class="p-3 d-flex flex-column justify-content-start">
                <p class="fw-bolder text-start font_family_poppins_bold">Blockchain</p>
                <p class="font-size-14 text-start font_family_poppins_light">
                  Lorem ipsum dolor sit amet, consectetur uadipelioeiusmod tempor incididunt ut labo
                  ipsum dolor sit amet, consecteturempor uq
                </p>
                <img src="@/assets/images/card_star.svg" alt="card_star" class="card_star" />
                <p
                  class="fw-bolder text-start font-size-16 text-primary text-decoration-underline pt-5"
                >
                  Explore
                </p>
              </div>
              <!-- Card content goes here -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      screenWidth: 992,
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
  methods: {
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
@import '~/assets/css/bootstrapBreakpoint.scss';

.w_100 {
  width: 100%;
}
.bg-lightGreen {
  background-color: rgba(240, 247, 255, 1);
}
/* CSS */
/* CSS */
.card_top {
  background-color: rgba(240, 247, 255, 1);
  perspective: 1000px; /* Adjust the perspective value for the desired effect */
}

.card-content {
  background-color: white;
  transform: rotateY(0deg); /* Adjust the rotation angle (-30deg) to create the perspective */
}
.card-content_3 {
  background-color: white;
  transform: rotateY(0deg); /* Adjust the rotation angle (-30deg) to create the perspective */
}
.card-content_2 {
  background-color: rgba(240, 247, 255, 1);
  transform: scale(1);
}
.card_star {
  width: 100px;
}

@include media-breakpoint-up(md) {
  .w_100 {
    width: 75%;
  }
}

@include media-breakpoint-up(lg) {
  .card-content {
    background-color: white;
    transform: rotateY(30deg); /* Adjust the rotation angle (-30deg) to create the perspective */
  }
  .card-content_3 {
    background-color: white;
    transform: rotateY(-30deg); /* Adjust the rotation angle (-30deg) to create the perspective */
  }
  .card-content_2 {
    background-color: rgba(240, 247, 255, 1);
    transform: scale(0.9);
  }
}
</style>
