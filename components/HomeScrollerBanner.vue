<template>
  <div class="alert alert-primary" role="alert">
    <div class="scroller">
      <p v-html="homeScrollerBannerContent"></p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['homeScrollerBannerContent']),
  },
};
</script>

<style scoped lang="scss">
.scroller {
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
}

.scroller p {
  display: inline-block;
  margin: 0;
  animation: marquee 20s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
