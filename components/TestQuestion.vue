<template>
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
          class="list-group-item border border-2 border-primary rounded text-dark fw-bolder mb-2"
          :class="
            question.userInput ? bgColor(question.userInput, value[1]) : checkAnswer(value[1])
          "
        >
          <!-- value[1].toLowerCase() === question.answer.toLowerCase() && 'bg_green', -->
          {{ String.fromCharCode(65 + index2) }}. {{ value[1] }}
        </li>
      </ul>
    </div>

    <div>
      <div v-if="question.answer">
        <span class="fw-bolder">Answer</span>:
        {{ answerArrToLetter(question.answer, question.options) }}
      </div>
      <!-- Spelling mistake "explainantion" -->
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
      const userInputArr = userInputParams;
      const value = valueParams.toLowerCase();
      if (!userInputArr.length) return '';

      let bgClr = '';
      userInputArr.forEach((answer) => {
        const userAnswer = answer.toLowerCase();
        if (userAnswer === value && this.question.resultStatus) {
          bgClr = 'bg_green';
        } else if (userAnswer === value) {
          bgClr = 'bg_gray ';
        }
      });

      const res = this.checkAnswer(valueParams);
      if (res) {
        bgClr = 'bg_green';
      }
      return bgClr;
    },

    checkAnswer(value) {
      let isAnswer = false;
      this.question.answer.forEach((ans) => {
        if (value.toLowerCase() === ans.toLowerCase()) {
          isAnswer = true;
        }
      });
      return isAnswer;
    },

    answerArrToLetter(answerArr, optionsArr) {
      let lettersArr = [];
      optionsArr.forEach((opt, index) => {
        answerArr.forEach((ans) => {
          if (ans === opt[1]) {
            // we are not taking option key "opt[0]" because it's not sync (decending order) eg: "option_A" key would be last option in frontend. So we used index in option array for letter
            const jj = String.fromCharCode(65 + index);
            lettersArr.push(jj);
          }
        });
      });
      return lettersArr;
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
