<template>
  <div v-if="!window" class="my-5">
    <h2 class="text-black font-size-44 fw-bolder text-center font_family_poppins_bold my-5">
      Our Blogs
    </h2>
    <div class="container">
      <div class="row g-4">
        <div
          v-for="(item, index) in computedLoopCount"
          :key="index"
          class="col-12 col-md-6 col-lg-4"
        >
          <div class="card h-100">
            <img src="@/assets/images/blogs_card.svg" alt="card_1" class="w-100" />
            <div class="d-flex flex-column justify-content-between h-100 p-3">
              <div class="">
                <p class="fw-bolder font-size-26 mb-0">Nunc sed eldqt lectus Lorem</p>
                <p class="font-size-14">1st Aug, 2022</p>
                <p class="font-size-14">
                  Lorem ipsum dolor sit amet, consectetur uadipelioeiusmod tempor incididunt ut labo
                  ipsum dolor sit amet, consecteturempor uq
                </p>
              </div>
              <div>
                <p class="fw-bolder font-size-16 text-primary text-decoration-underline pt-5">
                  Read More
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="fw-bolder font-size-16 text-primary text-decoration-underline text-end my-4">
        View More
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isServer: true, // Default to true, assuming server-side rendering
      screenWidth: 1200,
      lgMdLoopCount: 3,
      smLoopCount: 2,
    };
  },
  computed: {
    computedLoopCount() {
      return this.screenWidth >= 992 ? this.lgMdLoopCount : this.smLoopCount;
    },
  },
  mounted() {
    // Check if window is defined (not in server-side rendering)
    if (typeof window !== 'undefined') {
      this.isServer = false;
      this.screenWidth = window.innerWidth;
      window.addEventListener('resize', this.handleResize);
    }
  },
  methods: {
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
  },
  beforeDestroy() {
    // Remove the event listener when the component is destroyed
    if (!this.isServer) {
      window.removeEventListener('resize', this.handleResize);
    }
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';
.card {
  box-shadow: 6px 6px 10px 0 rgba(0, 0, 0, 0.09);
  border-radius: 10px;
}
</style>
