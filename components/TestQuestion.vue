<template>
  <div class="text-left">
    <h1 class="fw-bolder">Question</h1>
    <p class="fw-bolder my-4">{{ question.question }}</p>
    <div class="d-flex flex-column mt-2">
      <ul class="list-group">
        <li
          v-for="(value, index2) in question.options"
          :key="index2"
          class="list-group-item border border-2 border-primary rounded text-dark fw-bolder mb-4"
        >
          {{ index2 + 1 }}. {{ value[1] }}
        </li>
      </ul>
    </div>

    <div>
      <p><span class="fw-bolder">Answer</span>: {{ question.answer }}</p>
      <p><span class="fw-bolder">Explanation</span>: {{ question.explainantion }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: Object,
  },
};
</script>
