<template>
  <div class="bg_lightgreen">
    <div class="container py-0 py-md-5">
      <div class="row justify-content-center justify-content-lg-between py-5">
        <div class="col-12 col-lg-6">
          <div
            class="text-black d-flex flex-column align-items-center align-items-md-start text-center text-md-start"
          >
            <h2
              class="font-size-24 font-size-md-28 font-size-lg-50 fw-bolder text-black font_family_poppins_bold"
            >
              Take the next step towards your
              <span class="text-primary"> personal and professional goals </span>
            </h2>
            <p class="font-size-20 fw-light my-3">
              Lorem ipsum dolor sit amet consectetur adipiscing
            </p>
            <div class="row my-5">
              <div class="col-12 col-md-6">
                <h6 class="font-size-20 font-size-md-22 font_family_poppins_bold">
                  Returning Users:
                </h6>
                <p class="font-size-16 font-size-md-18 font_weight_600">
                  <span class="text-primary text-decoration-underline">Log in</span>
                  to continue an application.
                </p>
              </div>
              <div class="col-12 col-md-6 mt-4 mt-md-0">
                <h6 class="font-size-20 font-size-md-22 font_family_poppins_bold">
                  First-Time Users:
                </h6>
                <p class="font-size-16 font-size-md-18 font_weight_600">
                  <span class="text-primary text-decoration-underline">Create an account </span>
                  to start a new application
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-9 col-lg-5 mt-4 mt-md-0">
          <img src="~assets/images/next_step.svg" alt="next_step" class="w-100" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.bg_lightgreen {
  background: rgba(240, 247, 255, 1);
}

.bg-img {
  /* CSS */
  background: linear-gradient(rgba(9, 53, 104, 0.8), rgba(13, 74, 146, 0.8)),
    url('assets/images/bg-exprience.svg');
  background-size: cover;
}

.login_btn {
  background-color: transparent;
  color: var(--primary);
  border: 3px solid var(--primary);
  border-radius: 8px; /* Adjust the border radius as needed */
  padding: 10px 10px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  width: 110px;
}

/* Optionally, you can add hover styles to make the button interactive */
.login_btn:hover {
  background-color: var(--primary);
  color: white;
}

@include media-breakpoint-up(md) {
  .login_btn {
    background-color: transparent;
    color: var(--primary);
    border: 3px solid var(--primary);
    border-radius: 8px; /* Adjust the border radius as needed */
    padding: 10px 15px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    font-weight: 500;
    width: 150px;
  }
}
</style>
