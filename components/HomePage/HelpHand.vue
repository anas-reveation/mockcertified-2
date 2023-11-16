<template>
  <div class="bg-img">
    <div class="container py-lg-5 py-0">
      <div class="row justify-content-center align-items-center py-5">
        <div class="col-12 col-md-7">
          <div class="text-white text-center d-flex flex-column align-items-center">
            <h2
              class="font-size-24 font-size-md-28 font-size-lg-44 fw-bolder text-white font_family_poppins_bold"
            >
              Need a helping hand?
            </h2>
            <p class="font-size-20 font-size-lg-28 fw-light">We are one click away</p>
            <button class="banner_btn me-3 mt-3">Connect with us</button>
          </div>
          <div class="row text-white justify-content-center align-items-center mt-5">
            <div class="col-12 col-xl-8 d-flex flex-column flex-lg-row justify-content-between">
              <div class="d-flex align-items-center justify-content-center">
                <img src="~assets/images/mail_icon.svg" alt="mail_icon" class="icon" />
                <p class="mb-0 ms-2 font-size-16">johnsmith05@gmail.com</p>
              </div>
              <div class="d-flex align-items-center justify-content-center mt-3 mt-lg-0">
                <img src="~assets/images/phone_icon.svg" alt="mail_icon" class="icon" />
                <p class="mb-0 ms-2 font-size-16">+91-9830925261</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.bg-img {
  /* CSS */
  background: url('assets/images/help_hand_bg.svg');
  background-size: cover;
}
.banner_btn {
  background-color: transparent;
  color: white;
  border: 3px solid white;
  border-radius: 5px; /* Adjust the border radius as needed */
  padding: 10px 30px; /* Adjust the padding as needed */
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: 400;
}

/* Optionally, you can add hover styles to make the button interactive */
.banner_btn:hover {
  background-color: white;
  color: var(--primary);
}
.icon {
  height: 18px;
  width: 18px;
}

@include media-breakpoint-up(md) {
  .banner_btn {
    border-radius: 3px; /* Adjust the border radius as needed */
    padding: 6px 12px; /* Adjust the padding as needed */

    font-size: 14px;
  }
}
</style>
