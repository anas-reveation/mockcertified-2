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
              <div
                v-for="(testimonial, index) in testimonials"
                :key="index"
                :class="{ 'carousel-item': true, active: index === 0 }"
              >
                <div class="container">
                  <div class="row align-items-center justify-content-center">
                    <div class="col-12 col-lg-4 d-flex align-items-center justify-content-center">
                      <div class="circle-container p-2">
                        <img
                          :src="require(`@/assets/images/review_${index}.svg`)"
                          alt="review_student"
                          class="circle-image"
                        />
                      </div>
                    </div>
                    <div class="col-12 col-lg-8 pt-3 pt-lg-0">
                      <p
                        class="font-size-16 font-size-md-18 font-size-lg-20 text-center text-lg-start"
                      >
                        {{ testimonial.review }}
                      </p>
                      <div
                        class="d-flex align-items-center justify-content-center justify-content-lg-start pt-3"
                      >
                        <img src="~assets/images/comma.svg" alt="comma" />
                        <div class="d-flex flex-column ms-3">
                          <h6 class="font-size-24 fw-bolder mb-0 font_family_poppins_bold">
                            {{ testimonial.name }}
                          </h6>
                          <!-- Assuming you have a role property in your testimonial data -->
                          <p class="font-size-14 mb-0">{{ testimonial.role }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="screenWidth < 767" class="carousel-indicators">
              <button
                v-for="(testimonial, index) in testimonials"
                :key="index"
                type="button"
                data-bs-target="#carouselExampleControls"
                :data-bs-slide-to="index"
                :class="{ active: index === 0 }"
                :aria-current="index === 0 ? 'true' : null"
                :aria-label="`Slide ${index + 1}`"
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
      testimonials: [
        {
          name: 'Emily Johnson',
          review:
            'Fantastic resource! The PMP mock tests provided a realistic exam environment. They covered the breadth of topics, and the detailed explanations after each question helped me understand the concepts thoroughly.',
        },

        {
          name: 'Jessica Robinson',
          review:
            'I owe my success to these Azure Architect Associate mock tests. They provided a solid foundation and allowed me to fine-tune my skills. The format and difficulty level were spot-on!',
        },

        {
          name: 'Jordan Turner',
          review:
            "I'm impressed! These mock tests prepared me thoroughly for the Google Cloud Architect certification. The explanations were clear, and the questions covered the entire spectrum of the exam.",
        },

        {
          name: 'Derek Foster',
          review:
            'Highly recommend these ITIL 4 Foundation mock tests. They covered the material thoroughly, and the practice exams gave me a real sense of what to expect. A reliable resource for ITIL aspirants.',
        },

        {
          name: 'Jason Adams',
          review:
            'A big thank you to this platform for the Six Sigma Green Belt mock tests. The variety of questions and scenarios prepared me comprehensively, and the feedback was immensely helpful in fine-tuning my skills.',
        },
      ],
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
