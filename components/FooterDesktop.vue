<template>
  <div>
    <div class="p-2 container">
      <div class="row mt-5 mb-4">
        <div class="col-6">
          <NuxtLink to="/" class="navbar-brand">
            <img src="@/assets/images/logo_with_name.svg" alt="logo" class="footer-logo" />
          </NuxtLink>
        </div>

        <div class="col-6 text-end">
          <div class="fw-bolder font_size_14 text-white">
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
          </div>
        </div>
        <div class="row py-4">
          <div class="col-md-3">
            <li
              class="text-capitalize font_size_16 py-2 list-unstyled"
              :class="$route.path.match(/\/terms-conditions\/*/g) && 'bg_color fill_black'"
            >
              <NuxtLink to="/terms-conditions">
                <span class="p-1 text-white"> Terms and Conditions </span>
              </NuxtLink>
            </li>
            <li
              class="text-capitalize py-2 font_size_16 hover_clr list-unstyled"
              :class="$route.path.match(/\/privacy-policy\/*/g) && 'bg_color fill_black'"
            >
              <NuxtLink to="/privacy-policy">
                <span class="p-1 text-white"> Privacy policy </span>
              </NuxtLink>
            </li>

            <li
              class="text-capitalize py-2 font_size_16 hover_clr list-unstyled"
              :class="$route.path.match(/\/faq\/*/g) && 'bg_blue_color fill_black'"
            >
              <NuxtLink to="/faq">
                <span class="p-1 text-white"> FAQ </span>
              </NuxtLink>
            </li>
          </div>
          <div class="col-md-3">
            <li
              class="text-capitalize py-2 font_size_16 hover_clr list-unstyled"
              :class="$route.path.match(/\/contact-us\/*/g) && 'bg_blue_color fill_black'"
            >
              <NuxtLink to="/contact-us">
                <span class="p-1 text-white"> Contact Us </span>
              </NuxtLink>
            </li>

            <li
              class="text-capitalize py-2 font_size_16 hover_clr list-unstyled"
              :class="$route.path.match(/\/blog\/*/g) && 'bg_blue_color fill_black'"
            >
              <a href="https://blog.mockcertified.com">
                <span class="p-1 text-white"> Blogs </span>
              </a>
            </li>
          </div>
        </div>
        <div class="col-12 text-center">
          <div class="row align-items-center">
            <div class="col-md-8 text-md-start text-xl-end">
              <div class="fw-bold font_size_14 text-white me-xl-5">
                © Copyright {{ new Date().getFullYear() }} Mockcertified
                <!-- | Designed by
                <a href="https://www.reveation.io" target="_blank" class="text-primary"
                  >Reveation Labs</a
                >
                ❤️ -->
              </div>
            </div>
            <div class="col-md-4">
              <div class="row justify-content-end">
                <div class="col-md-5 col-xl-4">
                  <a :href="playstoreLink" target="_blank" class="">
                    <img
                      src="@/assets/images/GooglePlay.svg"
                      alt="GooglePlayStore"
                      class="icon-s"
                    />
                  </a>
                </div>
                <div class="col-xl-4 col-md-5">
                  <a :href="appleAppStoreLink" target="_blank" class="">
                    <img src="@/assets/images/AppStore.svg" alt="AppStore" class="icon-s" />
                  </a>
                </div>
              </div>
            </div>
          </div>
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
    playstoreLink: `https://play.google.com/store/apps/details?id=${process.env.GOOGLE_PLAYSTORE_ID}`,
    appleAppStoreLink: `https://apps.apple.com/in/app/MockCertified/${process.env.APPLE_APP_STORE_ID}`,
  }),
};
</script>

<style scoped>
.hr_line {
  border: 1px solid #888888;
}
.footer-logo {
  width: 180px;
}
.icon-s {
  width: 108px;
}
</style>
