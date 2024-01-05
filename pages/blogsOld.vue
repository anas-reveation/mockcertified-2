<template>
  <div></div>
</template>

<script>
export default {
  data: () => ({
    BLOG_URL: process.env.BLOG_URL,
  }),
  mounted() {
    window.location.href = this.BLOG_URL;
  },
};
</script>
