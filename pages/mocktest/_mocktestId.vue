<template>
  <div>
    <h1>{{ mocktestId }}</h1>
  </div>
</template>
<script>
export default {
  layout: 'homePageLayout',

  async asyncData({ params }) {
    const mocktestId = params.mocktestId;
    return { mocktestId };
  },
};
</script>
