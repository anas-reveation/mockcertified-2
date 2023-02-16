<template>
  <div class="bg-white p-2 container">
    <hr class="hr_line" />
    <div class="row">
      <div class="col-6">
        <div class="fw-bolder font_size_14">
          Stay Connected with us
          <span class="ms-1">
            <a :href="LINKEDIN_LINK" target="_blank">
              <img src="@/assets/images/linkedin_icon.svg" alt="linkedin_icon" class="ms-2" />
            </a>
            <a :href="FACEBOOK_LINK" target="_blank">
              <img src="@/assets/images/facebook_icon.svg" alt="facebook_icon" class="ms-2" />
            </a>
            <a :href="TWITTER_LINK" target="_blank">
              <img src="@/assets/images/twitter_icon.svg" alt="twitter_icon" class="ms-2" />
            </a>
            <a :href="INSTAGRAM_LINK" target="_blank">
              <img src="@/assets/images/instagram_icon.svg" alt="instagram_icon" class="ms-2" />
            </a>
          </span>
          <NuxtLink to="/faq" class="text-primary ms-2 font_size_12">FAQ</NuxtLink>
        </div>
      </div>
      <div class="col-6 text-end">
        <div class="fw-bolder font_size_14">
          © Copyright {{ new Date().getFullYear() }} Mockcertified | Designed by
          <a href="https://www.reveation.io" target="_blank" class="text-primary">Reveation Labs</a>
          ❤️
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    LINKEDIN_LINK: process.env.LINKEDIN_LINK,
    FACEBOOK_LINK: process.env.FACEBOOK_LINK,
    TWITTER_LINK: process.env.TWITTER_LINK,
    INSTAGRAM_LINK: process.env.INSTAGRAM_LINK,
  }),
};
</script>

<style scoped>
.hr_line {
  border: 1px solid #888888;
}
</style>
