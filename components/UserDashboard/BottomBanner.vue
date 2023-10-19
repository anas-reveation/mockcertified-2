<template>
  <div class="home_banner py-4">
    <div class="d-flex flex-column flex-lg-row justify-content-between align-items-center">
      <div class="text-break p-4">
        <h1 class="fw-bolder me-2 font_size_45 banner_title">Get the <br />Mockcertified App</h1>

        <div class="font_size_14 mt-4 banner_subtitle">And take mock tests anywhere you go!</div>
      </div>

      <div
        class="d-flex align-items-center mx-3 mx-lg-3 mb-3 mb-md-0 justify-content-center gap_20"
      >
        <a :href="playstoreLink" target="_blank" class="">
          <img src="@/assets/images/GooglePlay.svg" alt="GooglePlayStore" class="icon-s w-100" />
        </a>
        <a :href="appleAppStoreLink" target="_blank" class="ms-5">
          <img src="@/assets/images/AppStore.svg" alt="AppStore" class="icon-s w-100" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['authenticated'],
  data() {
    return {
      playstoreLink: `https://play.google.com/store/apps/details?id=${process.env.GOOGLE_PLAYSTORE_ID}`,
      appleAppStoreLink: `https://apps.apple.com/in/app/MockCertified/${process.env.APPLE_APP_STORE_ID}`,
    };
  },
};
</script>
