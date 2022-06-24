<template>
  <div class="container">
    <div class="container-fluid">
      <img src="@/assets/images/previous.png" class="pb-4" width="30" @click="goBack" alt="" />

      <img
        class="test-banner-image"
        src="https://cdn.pixabay.com/photo/2015/11/15/07/47/geometry-1044090__340.jpg"
        alt=""
      />
      <div class="mt-3">
        <span class="fs-4 fw-bolder text-success invisible">$12.99</span>

        <div class="d-flex justify-content-between mb-3 mt-3">
          <span class="fs-5 fw-bolder text-secondary">Trivia quiz</span>
          <span class="fs-6 fw-bolder text-dark">30 questions</span>
        </div>

        <span class="fs-4 fw-bold">Description</span>
        <p class="py-2 text-dark rounded">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nulla qui at iusto earum
          dolore sunt cum maxime eaque dolorem.
        </p>
        <div class="d-flex justify-content-between">
          <span class="fs-6 fw-bolder text-dark">30 min</span>
          <span class="fs-6 fw-bolder text-dark">50 marks</span>
        </div>
        <NuxtLink to="/test-screen">
          <button type="button" class="btn w-100 py-2 mb-4 mt-4 btn-color shadow">
            Attempt Test
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.push('/home');
    },
  },
};
</script>
<style>
.test-banner-image {
  width: 100%;
  border-radius: 10px;
}
</style>
