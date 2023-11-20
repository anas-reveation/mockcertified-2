<template>
  <div class="my-5 my-5">
    <div class="container d-flex flex-column justify-content-center align-items-center">
      <div class="text-center my-4 w_100">
        <h3 class="font-size-24 font-size-md-28 font-size-lg-44 fw-bolder font_family_poppins_bold">
          Go Easy On <sapn class="text-primary">Your Wallet</sapn>
        </h3>
        <p class="font-size-12 font-size-md-14 fw-light font_family_poppins_light pt-3">
          ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt iLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm
        </p>
      </div>
    </div>
    <div class="container">
      <div v-for="i in 3" class="row align-items-center justify-content-between">
        <div class="col-12 col-lg-5">
          <div class="card_wallet mb-4 p-3">
            <p class="font-size-16 fw-bolder font_family_poppins_bold with_underline">
              Lorem ipsum dolor sit amet
            </p>
            <p class="font-size-14">
              Vestibulum sed elit efficitur, mattis urna et, egestas augue. Fusce augue leo, elit
              efficitur, mattis urna et, e Vestibulum sed elit
            </p>
          </div>
        </div>
        <div class="col-2 d-none d-lg-flex align-items-center justify-content-center">
          <img src="~assets/images/ellipse.svg" alt="wallet_button" />
        </div>
        <div class="col-5 d-none d-lg-block">
          <p class="font-size-18 fw-bold m-0">
            MockCertified offers tests at very budget-friendly prices.
          </p>
        </div>
      </div>
      <div class="row align-items-center justify-content-center text-center d-flex d-lg-none">
        <div v-for="i in 3" class="col-12 py-3">
          <p class="font-size-16 font-size-lg-18 fw-bold m-0">
            MockCertified offers tests at very budget-friendly prices.
          </p>
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
  /* Add other card styling properties here */
}

.with_underline::after {
  content: '';
  display: block;
  border-bottom: 4px solid var(--primary); /* Change the color and style as needed */
  width: 48%; /* Adjust the width of the underline as needed */
  margin-top: 5px; /* Change the color and style as needed */
}

@include media-breakpoint-up(md) {
  .w_100 {
    width: 75%;
  }
}
</style>
