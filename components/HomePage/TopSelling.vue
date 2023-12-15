<template>
  <div class="bg-lightGreen py-5">
    <div class="container text-center">
      <div class="d-flex flex-column align-items-center justify-content-center">
        <h2
          class="font-size-44 fw-bolder font-size-24 font-size-md-28 font-size-lg-44 font_family_poppins_bold"
        >
          Our Top-Selling Tests
        </h2>
        <p
          class="fw-light font-size-10 font-size-md-12 font-size-lg-14 font_family_poppins_light text-center my-3 w_100"
        >
          Discover our bestsellers – top-notch tests. Crafted with precision, these assessments
          closely mirror real exams, covering everything you need to boost those skills for the big
          day!
        </p>
      </div>

      <div class="row py-5 g-5 align-items-center">
        <div class="col-12 col-md-6 col-lg-4">
          <div class="card_top">
            <div class="card-content">
              <img src="@/assets/images/pm_test.svg" alt="card_1" class="w-100" />
              <div class="p-3 d-flex flex-column justify-content-start">
                <p class="fw-bolder text-start font_family_poppins_bold font-size-18">
                  PROJECT MANAGEMENT
                </p>
                <p class="font-size-14 text-start font_family_poppins_light">
                  Score a solid 75 on our Mock Tests, and you're all set for PMP success! Ace PMP
                  with realistic simulations and assessments.
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
              <img src="@/assets/images/google_test.svg" alt="card_1" class="w-100" />
              <div class="p-3 d-flex flex-column justify-content-start bg-white">
                <p class="fw-bolder text-start font_family_poppins_bold font-size-18">
                  Google Cloud Architect
                </p>
                <p class="font-size-14 text-start font_family_poppins_light">
                  Engage in realistic scenarios and diverse assessments that align with the Google
                  Cloud Architect certification’s specific objectives.
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
        <div class="col-12 col-md-6 col-lg-4 d-none d-lg-block">
          <div class="card_top">
            <div class="card-content_3">
              <img src="@/assets/images/azure_test.svg" alt="card_1" class="w-100" />
              <div class="p-3 d-flex flex-column justify-content-start">
                <p class="fw-bolder text-start font_family_poppins_bold font-size-18">
                  Microsoft Azure
                </p>
                <p class="font-size-14 text-start font_family_poppins_light">
                  Tailored to Azure's challenges, this test ensures expertise in cloud solutions,
                  virtual networks, and Microsoft Azure services.
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
