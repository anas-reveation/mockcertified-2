e
<template>
  <div>
    <div class="bg_div">
      <div class="container py-5">
        <h2 class="font-size-28 font-size-md-38 font_family_poppins_bold text-white my-4">
          {{ $route.params.mockslug }}
        </h2>
      </div>
    </div>
    <div class="container">
      <div class="row mt-5 pt-5">
        <div class="col-12 col-xl-8 d-flex flex-column border_bottom">
          <h2
            class="font-size-24 font-size-md-28 font-size-lg-50 fw-bolder text-black font_family_poppins_bold"
          >
            AWS
          </h2>
          <p class="font-size-12 font-size-lg-14 fw-light my-2 font_family_poppins_light">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquimmodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
            euLorem ipsum dolor sit Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquimmodo consequat. Duis aute irure
          </p>
          <div class="row font-size-14 font-size-md-16 align-items-center text-primary">
            <div class="col-4 col-md-2 col-xl-2">
              <img src="@/assets/images/card_star.svg" alt="card_star" class="card_star" />
            </div>
            <div
              class="col-10 col-md-6 col-lg-5 d-flex align-items-center justify-content-between mt-2 mt-md-0"
            >
              <div class="div_circle"></div>
              <p class="mb-0">40 min</p>
              <div class="div_circle"></div>
              <p class="mb-0">40 questions</p>
              <div class="div_circle"></div>
              <p class="mb-0">80 marks</p>
            </div>
            <div
              class="col-10 col-md-6 col-lg-5 d-flex flex-column flex-md-row justify-content-between mt-2 mt-lg-0"
            >
              <div class="border_left">
                <P class="text-black mb-0 py-1 ps-0 ps-md-2"
                  >Created By
                  <span class="text-primary font_family_poppins_bold">John Smith</span>
                </P>
              </div>
              <div class="border_left">
                <P class="mb-0 py-1 ps-0 ps-md-2 text-decoration-underline">Watch Video </P>
              </div>
            </div>
          </div>
          <button class="login_btn my-4">Start Test</button>
        </div>
        <div class="col-4 d-none d-xl-flex">
          <div class="card">
            <img src="@/assets/images/card_1.svg" alt="card_1" class="w-100" />
            <div class="d-flex flex-column p-3">
              <p class="fw-bolder font_family_poppins_bold font-size-18">Lorum dolor sit amet</p>
              <div class="show_price py-2 px-3">
                <p class="fw-bolder font-size-22 mb-0">$ 80.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-xl-8 d-flex flex-column border_bottom py-4">
          <p class="font-size-18 font_family_poppins_bold">Benefit of this test</p>
          <div class="row">
            <div class="col-10">
              <div class="row gy-3">
                <div v-for="i in 6" class="col-12 col-md-6 col-lg-4 d-flex align-items-center">
                  <img src="~assets/images/tick.svg" alt="tick" class="tick_width" />
                  <p class="font-size-14 mb-0 ms-2">Lorem ipsum dolor sit ame</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-xl-10 d-flex flex-column py-4">
          <p class="font-size-18 font_family_poppins_bold">Featured reviews</p>
          <div class="row gy-3">
            <div v-for="i in 3" class="col-12 col-md-6 col-lg-4">
              <div class="">
                <div class="d-flex align-items-center">
                  <img
                    src="~assets/images/test_card_icon.svg"
                    alt="test_card_icon"
                    class="test_card_icon"
                  />
                  <p class="font_family_poppins_bold text-primary mb-0 mx-2">Joe Smith</p>
                  <img src="@/assets/images/card_star.svg" alt="card_star" class="card_star_1" />
                </div>
                <p class="font-size-14 font_family_poppins_light mt-2">
                  “Ut enim ad minim veniam, quis nostru etion ullamco laboris nisi ut aliquip ex ea
                  comodo consequat. Duis aute irure dolor in reprehe”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-block d-xl-none">
        <div class="card">
          <img src="@/assets/images/card_1.svg" alt="card_1" class="w-100" />
          <div class="d-flex flex-column p-3">
            <p class="fw-bolder font_family_poppins_bold font-size-18">Lorum dolor sit amet</p>
            <div class="show_price py-2 px-3">
              <p class="fw-bolder font-size-22 mb-0">$ 80.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MockTestPageLatestTest class="mt-5" />
    <IndividualTestNextStep />
  </div>
</template>

<script>
export default {
  layout: 'homePageLayout',
  name: 'mockslug',
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.bg_div {
  background-image: url('~@/assets/images/banner_cat.svg'); /* Path to your image */
  background-size: cover;
  width: 100%;
  border-radius: 0 0 20px 20px;
}
.div_circle {
  width: 6px;
  height: 6px;
  border-radius: 6px;
  background-color: var(--primary);
}

.border_left {
  border-left: 0px;
}
.login_btn {
  background-color: transparent;
  color: var(--primary);
  border: 3px solid var(--primary);
  border-radius: 8px; /* Adjust the border radius as needed */
  padding: 5px 10px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  width: 100px;
}

/* Optionally, you can add hover styles to make the button interactive */
.login_btn:hover {
  background-color: var(--primary);
  color: white;
}
.border_bottom {
  border-bottom: 2px solid #a5a5a5;
}

.card {
  box-shadow: 6px 6px 10px 0 rgba(0, 0, 0, 0.09);
}
.show_price {
  background: rgba(255, 193, 7, 0.21);
  width: 120px;
  border-radius: 35px;
}
.tick_width {
  width: 17px;
}
.card_star {
  height: 17px;
}
.test_card_icon {
  height: 30px;
}
.card_star_1 {
  height: 15px;
}

@include media-breakpoint-up(md) {
  .border_left {
    border-left: 1px solid black;
  }
  .login_btn {
    padding: 10px 15px;
    font-size: 16px;
    width: 150px;
  }
}

@include media-breakpoint-up(lg) {
  .card_star {
    height: 25px;
  }
}
</style>
