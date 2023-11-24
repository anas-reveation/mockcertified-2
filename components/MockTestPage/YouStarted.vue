<template>
  <div class="mb-5">
    <h2
      class="text-black font-size-24 font-size-md-28 font-size-lg-44 fw-bolder text-center font_family_poppins_bold mb-5"
    >
      Mock Test Programs To<span class="text-primary"> Get You Started</span>
    </h2>
    <div class="container">
      <div class="row g-3">
        <div v-for="i in 4" class="col-12 col-md-6 col-xl-3">
          <div class="card">
            <img src="@/assets/images/you_started_card.svg" alt="you_started_card" class="w-100" />
            <div class="p-3">
              <p class="fw-bolder font_family_poppins_bold font-size-18">Blockchain</p>
              <p class="font-size-14 mb-2 font_family_poppins_light">
                Lorum dolor sit amet, consectetur uadipelioeiusmpocididunt ut labo ipsum dolamet,
                secteturempor uq
              </p>
              <img src="@/assets/images/card_star.svg" alt="card_star" class="card_star" />
              <p class="fw-bolder font-size-16 text-primary text-decoration-underline pt-5 mb-0">
                Explore
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.card {
  box-shadow: 6px 6px 10px 0 rgba(0, 0, 0, 0.09);
}
.card_star {
  width: 100px;
}
</style>
