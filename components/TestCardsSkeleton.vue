<template>
  <div class="rounded-1 position-relative card_height">
    <AnimatedPlaceholder width="100%" height="100%" />
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.card_height {
  height: 205px;
}

@include media-breakpoint-up(sm) {
  .card_height {
    height: 265px;
  }
}

@include media-breakpoint-up(md) {
  .card_height {
    height: 265px;
  }
}

@include media-breakpoint-up(lg) {
  .card_height {
    height: 220px;
  }
}

@include media-breakpoint-up(xl) {
  .card_height {
    height: 180px;
  }
}
</style>
