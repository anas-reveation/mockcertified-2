<template>
  <!-- Similar like TestQuestion Component -->
  <div class="text-left">
    <h3 v-if="questionVisible" class="fw-bolder font_size_24 test_question_title">
      Question {{ index }}
    </h3>
    <p class="text-break test_question" :class="!questionVisible && 'fw-bolder'">
      <span v-if="!questionVisible" class="fw-bolder">{{ index }}. </span>
      {{ question.question }}
    </p>
    <div class="d-flex flex-column mt-2">
      <ul class="list-group">
        <li
          v-for="(value, index2) in question.options"
          :key="index2"
          class="list-group-item rounded text-break text-primary mb-2 bg_blue test_option"
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

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.bg_blue {
  background: #ecefff;
  border: #ecefff;
}

@include media-breakpoint-down(lg) {
  .test_question_title {
    font-size: 18px;
  }

  .test_question {
    font-size: 16px;
  }

  .test_option {
    font-size: 14px;
  }
}
</style>
