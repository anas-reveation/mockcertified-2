<template>
  <div class="background_image">
    <div class="py-4 container overflow-hidden">
      <div class="row">
        <div data-aos="fade-right" class="col-7 col-lg-5 head">
          <div>
            <h1 class="font_family_aileron">Elevate Your Skills</h1>
            <p class="font_family_montserrat fw-bold mt-4">WITH OUR ALEXA-POWERED MOCK TESTS</p>
          </div>
        </div>
        <div data-aos="fade-left" class="col-4 col-lg-3 position-relative input_field">
          <input type="text" />
          <i class="fa-solid fa-magnifying-glass search_btn"></i>
        </div>
        <div
          data-aos="fade-up"
          class="col-12 col-lg-4 text-center text-lg-end my-5 my-lg-0 auth_btn"
        >
          <div>
            <NuxtLink to="/auth/signup" class="mx-2 blue_button button">Sign Up!</NuxtLink>
            <NuxtLink to="/auth/login" class="blue_button button">Login</NuxtLink>
          </div>
        </div>
      </div>

      <div class="row mt-1 mt-xl-5">
        <div class="col-12 col-lg-6">
          <p class="font_family_dmsans text-center text-lg-start card_head_title">
            We got what you're looking for.
          </p>
          <div v-if="!isFetched">Loading</div>
          <div v-else class="row gx-3 gy-2">
            <div
              data-aos="fade-up"
              v-for="(data, i) in elevateData"
              :key="i"
              class="col-8 col-md-4 mt-3 mx-auto cards"
            >
              <NuxtLink to="/category">
                <div>
                  <img
                    class="w-100"
                    :src="$urlFor(data?.images[0]?.image?.asset?._ref).url()"
                    :alt="data?.images[0]?.alt"
                  />
                  <p class="font_family_aileron px-3 text-center py-3 fw-bold text-dark">
                    {{ data?.title }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-left"
          class="col-12 col-lg-6 d-flex justify-content-end align-items-end text-end mt-5 mt-lg-0"
        >
          <div>
            <NuxtLink to="/auth/login" class="blue_button explore_more">Explore More</NuxtLink>
            <p class="font_family_aileron bottom_text">
              Only at <span class="span_blue_color">Mockcertified</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { groq } from '@nuxtjs/sanity';

export default {
  data() {
    return {
      elevateData: [],
      isFetched: false,
    };
  },

  async mounted() {
    const query = groq`*[_type == "elevate"] | order( _updatedAt asc) { images, title }`;
    this.elevateData = await this.$sanity.fetch(query);
    this.isFetched = true;
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.fw-bold {
  font-weight: bold !important;
}

a {
  text-decoration: none !important;
}
a:hover {
  color: black;
}
.background_image {
  position: relative;
  background: linear-gradient(rgba(255, 255, 255, 0), rgb(0 0 0 / 61%)),
    url('~/assets/images/elevate.webp');
  background-size: cover;
  background-position: center;
  overflow: hidden;
  width: 100%;
  color: white;
}

.head h1 {
  font-size: 40px;
}
.head p {
  font-size: 10px;
  letter-spacing: 4px;
}

.cards div {
  background: #5271ff;
  min-height: 300px;
}

.cards:nth-child(2) div {
  background: white !important;
}

.cards img {
  object-fit: cover;
  height: 200px;
  object-position: bottom;
}

.cards p {
  font-size: 16px;
}

input:focus {
  outline: none;
}
.input_field input {
  position: absolute;
  top: 0;
  background: transparent;
  padding: 5px 20px;
  border-radius: 25px;
  border: solid 3px white;
  width: 100%;
  color: white;
}

.input_field .search_btn {
  position: absolute;
  right: 0;
  font-size: 20px;
  top: 9px;
}

.auth_btn .button {
  font-size: 11px !important;
}
.explore_more {
  font-size: 16px;
  font-weight: bold;
}

.card_head_title {
  font-size: 24px;
  font-weight: 700;
}
.bottom_text {
  font-size: 30px;
  font-weight: bold;
}
@include media-breakpoint-up(md) {
  .card_head_title {
    font-size: 35px;
  }
  .explore_more {
    font-size: 20px;
    font-weight: bold;
  }
}

@include media-breakpoint-up(lg) {
  .head h1 {
    font-size: 85px !important;
    line-height: 1;
  }
  .head p {
    font-size: 20px;
  }
  .cards p {
    min-height: 6rem;
  }
  .bottom_text {
    font-size: 45px;
  }
}
</style>
