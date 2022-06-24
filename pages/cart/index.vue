<template>
  <div class="container-fluid">
    <div class="btn shadow w-100 d-flex justify-content-between align-items-center">
      <img
        src="https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010__340.jpg"
        width="70"
        height="70"
        alt=""
      />
      <div class="d-flex flex-column">
        <span class="fs-5 fw-bolder">Test 1</span>
        <span class="fs-6 fw-normal">40 min</span>
      </div>
      <div class="d-flex flex-column">
        <img src="@/assets/images/minus-button.png" class="m-auto" width="25" height="25" alt="" />
        <span class="fs-6 fw-bolder">$20.99</span>
      </div>
    </div>
    <div class="btn shadow w-100 d-flex justify-content-between align-items-center">
      <img
        src="https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010__340.jpg"
        width="70"
        height="70"
        alt=""
      />
      <div class="d-flex flex-column">
        <span class="fs-5 fw-bolder">Test 2</span>
        <span class="fs-6 fw-normal">50 min</span>
      </div>
      <div class="d-flex flex-column">
        <img src="@/assets/images/minus-button.png" class="m-auto" width="25" height="25" alt="" />
        <span class="fs-6 fw-bolder">$25.99</span>
      </div>
    </div>

    <div class="d-flex justify-content-center mt-5 mb-5">
      <span class="fs-5 fw-bolder me-3"> Total: </span>
      <span class="fs-5 fw-bold text-success"> $46.99 </span>
    </div>

    <button type="submit" class="btn btn-primary btn-color w-100 py-2 mb-4">
      Proceed To Checkout
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.btn-color {
  background-color: #11a49b !important;
  color: white;
}
</style>
