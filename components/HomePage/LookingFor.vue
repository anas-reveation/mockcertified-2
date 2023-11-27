<template>
  <div class="my-5 pt-5 bg-lightGreen">
    <div class="container">
      <h2
        class="text-black font-size-24 font-size-md-28 font-size-lg-44 fw-bolder text-center font_family_poppins_bold mb-5"
      >
        We got what you're<span class="text-primary"> looking for</span>
      </h2>
      <div class="container">
        <div class="row g-3">
          <div v-for="i in 4" class="col-12 col-md-6 col-xl-3">
            <div class="card">
              <img src="@/assets/images/card_1.svg" alt="card_1" class="w-100" />
              <div class="p-3">
                <p class="fw-bolder font_family_poppins_bold font-size-18">Blockchain</p>
                <p class="font-size-14 font_family_poppins_light">
                  Lorem ipsum dolor sit amet, consectetur uadipelioeiusmod tempor incididunt ut labo
                  ipsum dolor sit amet, consecteturempor uq
                </p>
                <img src="@/assets/images/card_star.svg" alt="card_star" class="card_star" />
                <p class="fw-bolder font-size-16 text-primary text-decoration-underline pt-5 mb-0">
                  Explore
                </p>
              </div>
            </div>
          </div>
        </div>
        <p class="fw-bolder font-size-16 text-primary text-decoration-underline text-end py-4">
          View More
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.bg-lightGreen {
  background-color: rgba(240, 247, 255, 1);
}
.card {
  box-shadow: 6px 6px 10px 0 rgba(0, 0, 0, 0.09);
}
.card_star {
  width: 100px;
}
</style>
