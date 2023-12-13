<template>
  <div class="my-5 pb-5">
    <h2
      class="text-black font-size-24 font-size-md-28 font-size-lg-44 fw-bolder text-center font_family_poppins_bold mb-5"
    >
      What our students <span class="text-primary">are saying</span>
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
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <img src="~assets/images/preview_icon.svg" alt="preview_icon" />
            <span class="visually-hidden">Previous</span>
          </button>
        </div>
        <div class="col-12 col-md-10 px-3">
          <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div class="container">
                  <div class="row align-items-center justify-content-center">
                    <div class="col-12 col-lg-4 d-flex align-items-center justify-content-center">
                      <div class="circle-container p-2">
                        <img
                          src="~assets/images/review_student.svg"
                          alt="review_student"
                          class="circle-image"
                        />
                      </div>
                    </div>
                    <div class="col-12 col-lg-8 pt-3 pt-lg-0">
                      <p
                        class="font-size-16 font-size-md-18 font-size-lg-20 text-center text-lg-start"
                      >
                        “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestium vel lectus
                        in dolor porttitor cursus nec ac odio. Nullam in imperdiet lacus. Lorem
                        ipsum dolor sit amet, consectetur adsj dhnipiscing elit. “
                      </p>
                      <div
                        class="d-flex align-items-center justify-content-center justify-content-lg-start pt-3"
                      >
                        <img src="~assets/images/comma.svg" alt="comma" />
                        <div class="d-flex flex-column ms-3">
                          <h6 class="font-size-24 fw-bolder mb-0 font_family_poppins_bold">
                            John Smith
                          </h6>
                          <p class="font-size-14 mb-0">Project Manager</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="container">
                  <div class="row align-items-center justify-content-center">
                    <div class="col-12 col-lg-4 d-flex align-items-center justify-content-center">
                      <div class="circle-container p-2">
                        <img
                          src="~assets/images/review_student.svg"
                          alt="review_student"
                          class="circle-image"
                        />
                      </div>
                    </div>
                    <div class="col-12 col-lg-8 pt-3 pt-lg-0">
                      <p
                        class="font-size-16 font-size-md-18 font-size-lg-20 text-center text-lg-start"
                      >
                        “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestium vel lectus
                        in dolor porttitor cursus nec ac odio. Nullam in imperdiet lacus. Lorem
                        ipsum dolor sit amet, consectetur adsj dhnipiscing elit. “
                      </p>
                      <div
                        class="d-flex align-items-center justify-content-center justify-content-lg-start pt-3"
                      >
                        <img src="~assets/images/comma.svg" alt="comma" />
                        <div class="d-flex flex-column align-items-center ms-3">
                          <h6 class="font-size-24 fw-bolder mb-0 font_family_poppins_bold">
                            John Smith
                          </h6>
                          <p class="font-size-14 mb-0">Project Manager</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="container">
                  <div class="row align-items-center justify-content-center">
                    <div class="col-12 col-lg-4 d-flex align-items-center justify-content-center">
                      <div class="circle-container p-2">
                        <img
                          src="~assets/images/review_student.svg"
                          alt="review_student"
                          class="circle-image"
                        />
                      </div>
                    </div>
                    <div class="col-12 col-lg-8 pt-3 pt-lg-0">
                      <p
                        class="font-size-16 font-size-md-18 font-size-lg-20 text-center text-lg-start"
                      >
                        “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestium vel lectus
                        in dolor porttitor cursus nec ac odio. Nullam in imperdiet lacus. Lorem
                        ipsum dolor sit amet, consectetur adsj dhnipiscing elit. “
                      </p>
                      <div
                        class="d-flex align-items-center justify-content-center justify-content-lg-start pt-3"
                      >
                        <img src="~assets/images/comma.svg" alt="comma" />
                        <div class="d-flex flex-column align-items-center ms-3">
                          <h6 class="font-size-24 fw-bolder mb-0 font_family_poppins_bold">
                            John Smith
                          </h6>
                          <p class="font-size-14 mb-0">Project Manager</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="screenWidth < 767" class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide-to="2"
                aria-label="Slide 3"
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
            data-bs-target="#carouselExampleControls"
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
export default {
  data() {
    return {
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
