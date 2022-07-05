<template>
  <div class="btn shadow w-100 d-flex justify-content-between align-items-center">
    <img
      src="https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010__340.jpg"
      width="70"
      height="70"
      alt=""
    />
    <div class="d-flex flex-column">
      <span class="fs-5 fw-bolder">{{ title }}</span>
      <span v-if="timeLimit" class="fs-6 fw-normal">{{ timeLimit }} min</span>
    </div>

    <div class="d-flex flex-column">
      <!-- <img src="@/assets/images/plus.png" class="m-auto" width="25" height="25" alt="" />
        <span
          class="fs-6 fw-bolder text-success d-flex justify-content-between align-items-center mx-auto"
        >
          Attempted
        </span> -->

      <!-- ELSE -->
      <img
        v-if="removeItem"
        src="@/assets/images/minus-button.png"
        class="m-auto"
        width="25"
        height="25"
        alt=""
      />
      <img
        v-if="addItem"
        src="@/assets/images/plus.png"
        class="m-auto"
        width="25"
        height="25"
        alt=""
      />
      <span v-if="price" class="fs-6 fw-bolder">${{ price }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    timeLimit: Number,
    price: Number,
    removeItem: Boolean,
    addItem: Boolean,
  },
};
</script>
