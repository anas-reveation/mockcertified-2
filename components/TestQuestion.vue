<template>
  <div class="text-left">
    <h3 v-if="questionVisible" class="fw-bolder font_size_24">Question {{ index }}</h3>
    <p>
      <span v-if="!questionVisible" class="fw-bolder">{{ index }}. </span>
      {{ question.question }}
    </p>
    <div class="d-flex flex-column mt-2">
      <ul class="list-group">
        <li
          v-for="(value, index2) in question.options"
          :key="index2"
          class="list-group-item border border-2 border-primary rounded text-dark fw-bolder mb-2"
          :class="[
            question.userInput && bgColor(question.userInput, value[1]),
            value[1].toLowerCase() === question.answer.toLowerCase() && 'bg_green',
          ]"
        >
          {{ index2 + 1 }}. {{ value[1] }}
        </li>
      </ul>
    </div>

    <div>
      <div v-if="question.answer"><span class="fw-bolder">Answer</span>: {{ question.answer }}</div>
      <div v-if="question.explainantion">
        <span class="fw-bolder">Explanation</span>: {{ question.explainantion }}
      </div>
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

  methods: {
    bgColor(userInputParams, valueParams) {
      const userInput = userInputParams.toLowerCase();
      const value = valueParams.toLowerCase();
      if (!userInput) return '';
      if (userInput === value && this.question.resultStatus) {
        return 'bg_green';
      } else if (userInput === value) {
        return 'bg_gray ';
      }
    },
  },
};
</script>

<style scoped>
.bg_green {
  background: #94e4bd;
}
.bg_gray {
  background: #b3b3b3;
}
</style>
