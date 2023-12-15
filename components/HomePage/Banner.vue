<template>
  <div class="bg_div">
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div
          class="d-flex flex-column justify-content-center align-items-center col-12 col-md-10 col-xl-8"
        >
          <div class="text-center text-white mt-3 pt-3 mt-md-4 pt-md-4 pt-lg-5">
            <h2
              class="font-size-24 font-size-md-30 font-size-lg-50 fw-bold font_family_poppins_bold mb-0"
            >
              Elevate Your Skills
            </h2>
            <p
              class="font-size-10 font-size-md-12 font-size-lg-16 fw-light text-justify font_family_poppins_light my-3 my-md-4 my-lg-5"
            >
              Step into a realm of skill enhancement with Mockcertified's realistic mock tests. From
              a diverse range of IT certifications to Project Management Professional and beyond.
              Elevate your expertise through simulated challenges tailored to different domains,
              paving the way for success in your professional journey.
            </p>
          </div>
          <div class="d-flex mt-2">
            <button class="banner_btn me-2 me-md-3">JOIN FOR FREE</button>
            <button class="banner_btn ms-2 me-md-3">EXPLORE</button>
          </div>
        </div>
      </div>
      <div
        class="d-flex flex-column text-center text-white justify-content-center align-items-center"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.bg_div {
  background-image: url('~@/assets/images/banner_landing1.svg'); /* Path to your image */
  background-size: cover;
  height: 270px;
}
.banner_btn {
  background-color: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 3px; /* Adjust the border radius as needed */
  padding: 5px 0;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  font-weight: 400;
  width: 95px;
}

/* Optionally, you can add hover styles to make the button interactive */
.banner_btn:hover {
  background-color: white;
  color: var(--primary);
}
@include media-breakpoint-up(sm) {
  .bg_div {
    height: 280px;
  }
}

@include media-breakpoint-up(md) {
  .bg_div {
    height: 400px;
    border-radius: 6px;
    padding: 5px 12px;
  }
  .banner_btn {
    border-radius: 6px; /* Adjust the border radius as needed */
    padding: 10px 0px;
    width: 135px;
    font-size: 12px;
    border: 2px solid white;
  }
}

@include media-breakpoint-up(lg) {
  .bg_div {
    height: 570px;
  }
  .banner_btn {
    font-size: 16px;
    width: 180px;
  }
}

@include media-breakpoint-up(xl) {
  .bg_div {
    height: 600px;
  }
}
</style>
