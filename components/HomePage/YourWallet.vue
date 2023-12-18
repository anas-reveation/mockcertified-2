<template>
  <div class="my-5 my-5">
    <div class="container d-flex flex-column justify-content-center align-items-center">
      <div class="text-center my-4 w_100">
        <h3 class="font-size-24 font-size-md-28 font-size-lg-44 fw-bolder font_family_poppins_bold">
          Go Easy On <sapn class="text-primary">Your Wallet</sapn>
        </h3>
        <p class="font-size-12 font-size-md-14 fw-light font_family_poppins_light pt-3">
          Take it easy on your wallet! No need to break the bank – our tests are not only
          budget-friendly but also super realistic. Get top-notch preparation without the hefty
          price tag. Your success journey just got a lot more affordable!
        </p>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12 custom_col_5">
          <div class="card_wallet mb-4 p-3 card_height">
            <p class="font-size-16 fw-bolder font_family_poppins_bold with_underline">
              Reasonable Pricing
            </p>
            <p class="font-size-14 mt-3">
              Our mock tests come with a reasonable price tag, ensuring that quality preparation
              doesn't have to be expensive.
            </p>
          </div>
          <div class="card_wallet mb-4 p-3 card_height">
            <p class="font-size-16 fw-bolder font_family_poppins_bold with_underline">
              Reliable Assessments
            </p>
            <p class="font-size-14 mt-3">
              Trust in the reliability of our mock tests as we've carefully crafted each assessment
              to align with certification standards.
            </p>
          </div>
          <div class="card_wallet mb-4 p-3 card_height">
            <p class="font-size-16 fw-bolder font_family_poppins_bold with_underline">
              Realistic Exam Simulations
            </p>
            <p class="font-size-14 mt-3">
              Our mock tests are designed to be highly realistic, offering a practical experience
              that prepares you effectively for the actual exam.
            </p>
          </div>
        </div>
        <div class="custom_col_2 d-none d-xl-flex align-items-center justify-content-center pb-4">
          <img src="~assets/images/wallet_element.svg" alt="wallet_button" />
        </div>
        <div class="col-12 custom_col_5">
          <div class="card_wallet_2 mb-4 p-3 d-flex align-items-center card_height">
            <p class="font-size-14 font-size-md-16 fw-bold m-0 text-primary ps-4">
              MockCertified offers tests at very budget-friendly prices.
            </p>
          </div>
          <div class="card_wallet_2 mb-4 p-3 d-flex align-items-center card_height">
            <p class="font-size-14 font-size-md-16 fw-bold m-0 text-primary ps-4">
              Project Management Tests at only $9.99 !
            </p>
          </div>
          <div class="card_wallet_2 mb-4 p-3 d-flex align-items-center card_height">
            <p class="font-size-14 font-size-md-16 fw-bold m-0 text-primary ps-4">
              With the uptimelined 2023 format.
            </p>
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
.card_wallet {
  background-color: rgba(248, 248, 255, 1);
  box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  /* Add other card styling properties here */
}
.card_wallet_2 {
  box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, 0.08);
  border: 1px solid var(--primary);
  border-radius: 10px;
}
.with_underline {
  display: inline; /* Set display to inline to only cover the text */
  border-bottom: 4px solid var(--primary); /* Change the color and style as needed */
  padding-bottom: 2px;
}

.card_height {
  height: 160px;
}

@include media-breakpoint-up(md) {
  .w_100 {
    width: 75%;
  }
}

@include media-breakpoint-up(xl) {
  .card_height {
    height: 130px;
  }
  .custom_col_5 {
    width: 47%;
  }
  .custom_col_2 {
    width: 6%;
  }
}
</style>
