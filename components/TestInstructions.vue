<template>
  <div class="px-sm-5">
    <div class="mb-3">
      <h2 class="ms-3 fw-bolder font_size_32">Instructions</h2>
    </div>
    <div v-html="bodyContent"></div>
  </div>
</template>

<script>
export default {
  props: {
    bodyContent: String,
  },
};
</script>
