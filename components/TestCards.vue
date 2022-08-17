<template>
  <div class="bg-secondary border border-2 border-dark rounded-1 px-2 py-1">
    <p class="text-capitalize fs-3 font_weight" v-if="title">{{ title }}</p>
    <p v-if="description" class="font_family_roboto">
      {{ description }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    // timeLimit: Number,
    // price: Number | String,
    // removeItem: Boolean,
    // addItem: Boolean,
    // testStatus: {
    //   type: String,
    //   default: 'null',
    // },
  },
  //   data() {
  //     return {
  //       statusColor: null,
  //       statusName: null,
  //     };
  //   },
  //   mounted() {
  //     if (this.testStatus === 'COMPLETED') {
  //       this.statusName = 'completed';
  //       this.statusColor = 'text-success';
  //     } else if (this.testStatus === 'IN_PROGRESS') {
  //       this.statusName = 'In Progress';
  //       this.statusColor = 'text-warning';
  //     } else if (this.testStatus === 'ABORTED') {
  //       this.statusName = 'Aborted';
  //       this.statusColor = 'text-danger';
  //     }
  //   },
};
</script>
