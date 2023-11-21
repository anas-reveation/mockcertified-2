<template>
  <div class="bg_div">
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div
          class="d-flex flex-column justify-content-center align-items-center col-12 col-md-10 col-xl-8"
        >
          <div class="text-center text-white my-3 py-3 my-md-4 py-md-4 py-lg-5">
            <h2
              class="font-size-24 font-size-md-30 font-size-lg-50 fw-bold font_family_poppins_bold"
            >
              Elevate Your Skills
            </h2>
            <p
              class="font-size-10 font-size-md-12 font-size-lg-16 fw-light text-justify font_family_poppins_light mt-3"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris eiusmod te Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do niam, quis nostrud exercitaeiusmod te
            </p>
          </div>
          <div class="d-flex">
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
  background-image: url('~@/assets/images/main_bg.svg'); /* Path to your image */
  background-size: cover;
  width: 100%;
  height: 330px;
}
.banner_btn {
  background-color: transparent;
  color: white;
  border: 3px solid white;
  border-radius: 2px; /* Adjust the border radius as needed */
  padding: 5px 0;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  font-weight: 400;
  width: 120px;
}

/* Optionally, you can add hover styles to make the button interactive */
.banner_btn:hover {
  background-color: white;
  color: var(--primary);
}
@include media-breakpoint-up(sm) {
  .bg_div {
    height: 370px;
  }
}

@include media-breakpoint-up(md) {
  .bg_div {
    height: 480px;
    border-radius: 3px;
    padding: 5px 12px;
  }
  .banner_btn {
    border-radius: 5px; /* Adjust the border radius as needed */
    padding: 10px 0px;
    width: 135px;
  }
}

@include media-breakpoint-up(lg) {
  .bg_div {
    height: 620px;
  }
  .banner_btn {
    font-size: 16px;
    width: 180px;
  }
}

@include media-breakpoint-up(xl) {
  .bg_div {
    height: 750px;
  }
}
</style>
