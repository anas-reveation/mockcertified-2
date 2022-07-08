<template>
  <div class="btn shadow w-100 d-flex justify-content-between align-items-center">
    <img
      src="https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010__340.jpg"
      width="70"
      height="70"
      alt=""
    />
    <div class="d-flex flex-column">
      <span class="fs-5 fw-bolder text-capitalize text-break">{{ title }}</span>
      <span v-if="timeLimit" class="fs-6 fw-normal">{{ timeLimit }} min</span>
    </div>

    <div class="d-flex flex-column">
      <!-- <img src="@/assets/images/plus.png" class="m-auto" width="25" height="25" alt="" /> -->
      <span
        v-if="statusColor"
        class="fs-6 fw-bolder d-flex justify-content-between align-items-center mx-auto"
        :class="statusColor"
      >
        {{ statusName }}
      </span>
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
    price: Number | String,
    removeItem: Boolean,
    addItem: Boolean,
    testStatus: {
      type: String,
      default: 'null',
    },
  },
  data() {
    return {
      statusColor: null,
      statusName: null,
    };
  },
  mounted() {
    if (this.testStatus === 'ATTEMPTED') {
      this.statusName = 'Attempted';
      this.statusColor = 'text-success';
    } else if (this.testStatus === 'IN_PROGRESS') {
      this.statusName = 'In Progress';
      this.statusColor = 'text-warning';
    } else if (this.testStatus === 'ABANDONED') {
      this.statusName = 'Abandoned';
      this.statusColor = 'text-danger';
    }
  },
};
</script>
