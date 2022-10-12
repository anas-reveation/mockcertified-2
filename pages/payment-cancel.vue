<template>
  <div class="container px-4">
    <NavbarLogo />

    <img class="position-absolute top-0 end-0 oval_img" src="@/assets/images/oval.jpg" alt="oval" />
    <h1 class="my-5 text-sm-center font_size_36">Payment Status</h1>
    <div class="text-center">
      <img src="@/assets/images/failed_icon.svg" alt="failed-icon" />

      <p class="mt-3 font_size_32">
        Your
        <br class="d-sm-none" />
        payment
        <br class="d-sm-none" />
        was unsuccessful
      </p>

      <div class="mt-5d">
        <NuxtLink
          class="btn btn-white border-2 border-primary text-primary w-75 width_res"
          to="/category"
        >
          Go to category
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'introLayout',
};
</script>

<style scoped lang="scss">
@import '~/assets/css/auth.scss';
@import '~bootstrap/scss/_functions.scss';
@import '~bootstrap/scss/_variables.scss';
@import '~bootstrap/scss/mixins/_breakpoints';

@include media-breakpoint-up(sm) {
  .width_res {
    width: 400px !important;
  }
}
</style>
