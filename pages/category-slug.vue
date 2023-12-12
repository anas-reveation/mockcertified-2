<template>
  <div>
    <div class="bg_div">
      <div class="container">
        <h2 class="font-size-38 text-white py-5 font_family_poppins_light">
          <span class="font_family_poppins_bold">Categories</span>
          > Google
        </h2>
      </div>
    </div>
    <div class="my-5 my-5">
      <div class="container d-flex flex-column justify-content-center align-items-center">
        <div class="text-center my-4 w_100">
          <h3
            class="font-size-24 font-size-md-28 font-size-lg-44 fw-bolder font_family_poppins_bold"
          >
            Find the right category
          </h3>
        </div>
      </div>
      <div class="container">
        <div class="row g-4">
          <div v-for="i in 5" class="col-12 col-md-6 col-lg-4">
            <div class="card h-100 d-flex flex-row p-3">
              <img src="~assets/images/category_img.svg" alt="category_img" class="card_img" />
              <div class="ms-3">
                <p class="fw-bolder font-size-18 mb-2">Adex</p>
                <p class="fw-light font-size-14">lorem ipsum dolor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'homePageLayout',
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.bg_div {
  background-image: url('~@/assets/images/banner_cat.svg'); /* Path to your image */
  background-size: cover;
  width: 100%;
}

.card {
  box-shadow: 6px 6px 10px 0 rgba(0, 0, 0, 0.09);
}
</style>
