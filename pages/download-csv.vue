<template>
  <div class="text-center">
    <a
      :href="`data:text/csv;charset=utf-8,${csvString}`"
      class="btn btn-primary"
      download="questionFormat.csv"
    >
      Download CSV</a
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      csvString: `question,optionA,optionB,optionC,optionD,answer,explanation
What is color of Apple?,yellow,orange,red,blue,optionC,Apple is red in color
In which direction sun rise?,north,east,west,south,optionB,Sun rise in east direction
`,
    };
  },
};
</script>
