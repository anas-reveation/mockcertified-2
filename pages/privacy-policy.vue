<template>
  <div class="container px-4">
    <div class="position-absolute top-0 end-0 p-2">
      <NuxtLink to="/">
        <img src="@/assets/images/logo.svg" alt="logo" />
      </NuxtLink>
    </div>

    <img class="position-absolute top-0 end-0 oval_img" src="@/assets/images/oval.jpg" alt="oval" />

    <h1 class="mt-5 mb-4 font_size_36">
      Privacy
      <br />
      Policy
    </h1>

    <div class="fw-bold font_size_16">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, blanditiis asperiores
      inventore tempora nesciunt tenetur officiis dolorem neque, quam a, voluptatibus eius.
      Dignissimos nam tempore doloremque aspernatur totam itaque dolorem.
    </div>
  </div>
</template>

<script>
export default {
  layout: 'introLayout',
};
</script>

<style scoped lang="scss">
@import '~/assets/css/auth.scss';
</style>
