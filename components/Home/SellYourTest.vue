<template>
  <div class="background_image">
    <div class="py-4 container">
      <div class="row justify-content-between">
        <div class="col-9 col-lg-5 head">
          <div data-aos="fade-right">
            <h1 class="font_family_aileron">Profit from Your Knowledge: Sell Your Tests!</h1>
          </div>
          <p class="mt-3 mb-5 font_family_montserrat">SIGN UP NOW AND START YOUR JOURNEY!</p>
        </div>
        <div class="col-8 col-lg-4 input_field position-relative mx-auto mx-lg-0">
          <input type="text" />
          <i class="fa-solid fa-magnifying-glass search_btn"></i>
        </div>
      </div>

      <div class="row my-5">
        <div class="col-9 col-sm-6 col-lg-4 col-xxl-3 mx-auto mx-lg-0">
          <button class="blue_button fw-bold">REGISTER NOW TO GET STARTED</button>
        </div>
      </div>

      <div data-aos="fade-left" class="text-end mockcertified_text">
        <p class="font_family_aileron">
          Only at <span class="span_blue_color">Mockcertified</span>.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.background_image {
  background: url('~/assets/images/sell.png');
  background-size: cover;
  background-position: center;
  width: 100%;
  background-color: black;
  color: white;
}

.head h1 {
  font-size: 40px;
  line-height: 1;
}
.head p {
  font-size: 14px;
}
input:focus {
  outline: none;
}
.input_field {
  display: flex;
  justify-content: center !important;
  align-items: flex-start;
}

.input_field input {
  background: transparent;
  padding: 5px 20px;
  border-radius: 25px;
  border: solid 3px white;
  width: 100%;
  position: relative;
  color: white;
}

.input_field .search_btn {
  position: absolute;
  right: 25px;
  top: 10px;
}
.blue_button {
  font-size: 12px;
}

.mockcertified_text {
  font-size: 30px;
  font-weight: bold;
}
@include media-breakpoint-up(md) {
  .head h1 {
    font-size: 55px;
  }
  .blue_button {
    font-size: 16px;
  }
}

@include media-breakpoint-up(lg) {
  .head h1 {
    font-size: 85px;
  }
  .head p {
    font-size: 20px;
  }
  .mockcertified_text {
    font-size: 52px !important;
  }

  .blue_button {
    font-size: 21px;
  }
}
</style>