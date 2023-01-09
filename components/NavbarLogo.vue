<template>
  <div class="container">
    <div class="text-center text-sm-start p-2">
      <NuxtLink to="/">
        <img src="@/assets/images/logo_with_name.svg" alt="logo" class="logo_with_name" />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';
.mobile_logo {
  width: 200px;
}

@include media-breakpoint-down(md) {
  .logo_with_name {
    object-fit: contain;
    width: 150px;
  }
}

@include media-breakpoint-between(md, lg) {
  .logo_with_name {
    width: 140px;
  }
}

@include media-breakpoint-up(lg) {
  .logo_with_name {
    width: 190px;
  }
}
</style>
