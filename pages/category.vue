<template>
  <div class="container-fluid">
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <form class="d-flex w-100">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success" type="button">Search</button>
        </form>
      </div>
    </nav>
    <div class="btn shadow w-100 d-flex justify-content-between align-items-center">
      <img
        src="https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010__340.jpg"
        width="70"
        height="70"
        @click="product"
        alt=""
      />
      <div class="d-flex flex-column" @click="product">
        <span class="fs-5 fw-bolder">Test 1</span>
        <span class="fs-6 fw-normal">40 min</span>
      </div>
      <div class="d-flex flex-column">
        <img src="@/assets/images/plus.png" class="m-auto" width="25" height="25" alt="" />
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
        <span class="fs-6 fw-normal">40 min</span>
      </div>
      <div class="d-flex flex-column">
        <img src="@/assets/images/plus.png" class="m-auto" width="25" height="25" alt="" />
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
        <span class="fs-5 fw-bolder">Test 3</span>
        <span class="fs-6 fw-normal">40 min</span>
      </div>
      <div class="d-flex flex-column">
        <img src="@/assets/images/plus.png" class="m-auto" width="25" height="25" alt="" />
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
        <span class="fs-5 fw-bolder">Test 4</span>
        <span class="fs-6 fw-normal">40 min</span>
      </div>
      <div class="d-flex flex-column">
        <img src="@/assets/images/plus.png" class="m-auto" width="25" height="25" alt="" />
        <span class="fs-6 fw-bolder">$20.99</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  computed: {},
  methods: {
    product() {
      this.$router.push('tests/12');
    },
    addToCart() {
      this.cart++;
    },
  },
};
</script>

<style>
.btn-color {
  background-color: #11a49b !important;
  color: white;
}
</style>
