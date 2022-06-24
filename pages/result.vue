<template>
  <div class="container">
    <div class="container-fluid">
      <img src="@/assets/images/previous.png" class="pb-4" width="30" @click="goBack" alt="" />

      <!-- <img
        class="test-banner-image"
        src="https://cdn.pixabay.com/photo/2015/11/15/07/47/geometry-1044090__340.jpg"
        alt=""
      /> -->
      <div class="result-banner shadow d-flex flex-column align-items-center">
        <div
          class="score opacity-75 border border-success border-5 rounded-circle d-flex justify-content-center align-items-center"
        >
          <span class="fs-4 fw-bolder">64%</span>
        </div>
        <div
          class="ps-3 pe-3 w-100 d-flex justify-content-between align-items-center gap-3 flex-grow-1"
        >
          <div class="d-flex flex-column justify-content-between mb-3 mt-3">
            <span class="fs-5 fw-bolder text-secondary mb-3">30 Total</span>
            <span class="fs-6 fw-bolder text-dark">20 Attempted</span>
          </div>
          <div class="d-flex flex-column justify-content-between mb-3 mt-3">
            <span class="fs-5 fw-bolder text-secondary mb-3">18 Correct</span>
            <span class="fs-6 fw-bolder text-dark">2 Incorrect</span>
          </div>
        </div>
      </div>
      <div class="mt-3">
        <!-- <span class="fs-4 fw-bolder text-success invisible">$12.99</span> -->

        <div class="d-flex justify-content-between mb-3 mt-3">
          <span class="fs-5 fw-bolder text-secondary">Trivia quiz</span>
          <span class="fs-6 fw-bolder text-dark"></span>
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
        <div class="d-flex justify-content-between gap-2 mt-4 pb-5">
          <button type="button" class="btn w-100 py-2 btn-color shadow mb-5" @click="attempt">
            Attempt again
          </button>

          <button type="button" class="btn w-100 py-2 btn-color shadow mb-5">Check Answers</button>
        </div>
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
    attempt() {
      this.$router.push('/test-screen');
    },
  },
};
</script>
<style>
.result-banner {
  width: 100%;
  min-width: 280px;
  min-height: 280px;
  border-radius: 10px;
}
.score {
  width: 100px;
  height: 100px;
}
</style>
