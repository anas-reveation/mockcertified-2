<template>
  <div class="d-flex justify-content-between align-items-center shadow w-100 p-4">
    <div class="d-flex flex-column text-start">
      <span class="fs-5 fw-bolder text-capitalize text-break">{{ title }}</span>
      <span v-if="timeLimit" class="fs-6 fw-normal">{{ timeLimit }} min</span>
    </div>

    <div class="d-flex flex-column">
      <span v-if="statusColor" class="fs-6 fw-bolder" :class="statusColor">
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
    if (this.testStatus === 'COMPLETED') {
      this.statusName = 'completed';
      this.statusColor = 'text-success';
    } else if (this.testStatus === 'IN_PROGRESS') {
      this.statusName = 'In Progress';
      this.statusColor = 'text-warning';
    } else if (this.testStatus === 'ABORTED') {
      this.statusName = 'Aborted';
      this.statusColor = 'text-danger';
    }
  },
};
</script>
