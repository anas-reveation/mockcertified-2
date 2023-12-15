<template>
  <div class="bg-img">
    <div class="container py-0 py-md-5">
      <div class="row justify-content-center justify-content-md-between py-5">
        <div class="col-12 col-md-7 col-xl-6">
          <div
            class="text-white d-flex flex-column align-items-center align-items-md-start text-center text-md-start"
          >
            <h2
              class="font-size-24 font-size-md-28 font-size-lg-44 fw-bolder text-white font_family_poppins_bold"
            >
              Experience Tests Like <br />Never Before
            </h2>
            <p class="font-size-12 font-size-lg-14 fw-light my-2 my-xl-4 font_family_poppins_light">
              Explore a new way of testing with Alexa-integrated mock tests. Connect easily, manage
              your time better, and enjoy tests without straining your eyes in front of the screen
              for hours.
            </p>
            <button class="banner_btn me-3 mt-3">JOIN FOR FREE</button>
          </div>
        </div>
        <div class="col-10 col-md-5 mt-4 mt-md-0">
          <img src="~assets/images/exprience.svg" alt="exprience" class="w-100" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.bg-img {
  /* CSS */
  background: linear-gradient(rgba(9, 53, 104, 0.8), rgba(13, 74, 146, 0.8)),
    url('assets/images/bg-exprience.svg');
  background-size: cover;
}
.banner_btn {
  background-color: transparent;
  color: white;
  border: 2px solid white;
  border-radius: 6px; /* Adjust the border radius as needed */
  padding: 6px 12px; /* Adjust the padding as needed */
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
}

/* Optionally, you can add hover styles to make the button interactive */
.banner_btn:hover {
  background-color: white;
  color: var(--primary);
}

@include media-breakpoint-up(md) {
  .banner_btn {
    border-radius: 6px; /* Adjust the border radius as needed */
    padding: 10px 30px; /* Adjust the padding as needed */
    font-size: 16px;
  }
}
</style>
