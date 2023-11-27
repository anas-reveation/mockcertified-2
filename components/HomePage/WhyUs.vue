<template>
  <div class="bg-lightGreen">
    <div class="container py-5">
      <h2
        class="font-size-24 font-size-md-28 font-size-lg-44 fw-bolder text-black text-center font_family_poppins_bold"
      >
        Why US?
      </h2>
      <div class="row py-5 g-4">
        <div v-for="i in 4" class="col-12 col-md-6 col-lg-3 pt-5">
          <div
            class="d-flex flex-column justify-content-center align-items-center bg-white px-3 rounded_border"
          >
            <div class="d-flex flex-column justify-content-center align-items-center">
              <div class="upper_circle d-flex align-items-center justify-content-center">
                <img
                  class="element_h_w"
                  src="~assets/images/why_us_element.svg"
                  alt="why_us_element"
                />
              </div>
              <div class="bg_circle"></div>
            </div>
            <div class="text-center py-4">
              <p class="text-primary font-size-16 fw-bolder font_family_poppins_bold">
                Lorem Ipsum
              </p>
              <p class="font-size-14">Lorem ipsum dolor sit amet, consectetur ipsum dolor sit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-lightGreen {
  background-color: rgba(240, 247, 255, 1);
}
.bg_circle {
  background-color: rgba(8, 110, 229, 1);
  width: 160px;
  height: 80px;
  border-radius: 0 0 80px 80px;
}
.upper_circle {
  background-color: white;
  width: 140px;
  height: 140px;
  border-radius: 70px;
  position: absolute;
  margin: -80px 0 0 0;
  border: 2px solid blue;
}
.element_h_w {
  width: 50px;
  height: 50px2;
}
.rounded_border {
  border-radius: 1rem;
}
</style>
