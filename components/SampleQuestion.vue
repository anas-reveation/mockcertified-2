<template>
  <!-- Similar like TestQuestion Component -->
  <div class="text-left">
    <h3 v-if="questionVisible" class="fw-bolder font_size_24">Question {{ index }}</h3>
    <p :class="!questionVisible && 'fw-bolder'">
      <span v-if="!questionVisible" class="fw-bolder">{{ index }}. </span>
      {{ question.question }}
    </p>
    <div class="d-flex flex-column mt-2">
      <ul class="list-group">
        <li
          v-for="(value, index2) in question.options"
          :key="index2"
          class="list-group-item rounded text-primary mb-2 bg_blue"
        >
          {{ String.fromCharCode(65 + index2) }}. {{ value[1] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: Object,
    index: Number,
    questionVisible: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.bg_blue {
  background: #ecefff;
  border: #ecefff;
}
</style>
