<template>
  <div class="my-5">
    <h2 class="text-black font-size-44 fw-bolder text-center font_family_poppins_bold my-5">
      Our Blogs
    </h2>
    <div class="container">
      <div class="row g-4">
        <div v-for="i in loopCount" class="col-12 col-md-6 col-lg-4">
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
      screenWidth: process.client ? window.innerWidth : 0,
    };
  },
  computed: {
    loopCount() {
      return this.screenWidth > 991 ? 3 : 2;
    },
  },
  mounted() {
    if (process.client) {
      window.addEventListener('resize', this.handleResize);
    }
  },
  beforeDestroy() {
    if (process.client) {
      window.removeEventListener('resize', this.handleResize);
    }
  },
  methods: {
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
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
