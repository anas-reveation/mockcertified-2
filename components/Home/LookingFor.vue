<template>
  <div class="background">
    <div class="container py-5 font_family_dmsans">
      <div class="head">
        <h1 class="py-5 text-center text-light fw-bold">We got what you're looking for?</h1>
      </div>

      <div class="row gx-1 gx-lg-3 gx-xl-5">
        <div
          class="col-12 col-md-4 my-4 my-lg-0 cards_container"
          v-for="(data, i) in lookingForData"
          :key="i"
        >
          <NuxtLink to="/category">
            <div data-aos="flip-left" class="cards">
              <div>
                <img
                  class="w-100"
                  :src="$urlFor(data?.image?.asset?._ref).url()"
                  :alt="data?.image?.alt"
                />
              </div>
              <div class="card_text_container">
                <p class="card_title font_family_Neuemachina fw-bold">{{ data.title }}</p>
                <p class="card_subtitle">{{ data.subtitle }}</p>
              </div>
            </div>
          </NuxtLink>
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
      lookingForData: [],
      isFetched: false,
    };
  },

  async mounted() {
    const query = groq`*[_type == "looking"] {_createdAt, image, title, subtitle }`;
    this.lookingForData = await this.$sanity.fetch(query);
    this.isFetched = true;
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';
.fw-bold {
  font-weight: bold !important;
}
.background {
  background: rgb(1 30 17);
  color: black;
}

.container {
  width: 80% !important;
}

.head h1 {
  font-size: 28px;
}
.cards img {
  height: 230px;
  object-fit: cover;
  object-position: bottom;
}

.card_text_container {
  background: var(--light-blue);
  color: black;
  padding: 1rem 1rem;
  text-align: center;
}

.cards_container:nth-child(2) .card_text_container {
  background: white !important;
}

.card_text_container .card_title {
  font-size: 16px;
  font-weight: bold !important;
}

.card_subtitle {
  font-size: 12px;
}

@include media-breakpoint-up(md) {
  .head h1 {
    font-size: 55px;
  }
  .card_text_container {
    min-height: 9rem;
  }
  .card_text_container .card_title {
    font-size: 18px;
  }
  .card_subtitle {
    font-size: 14px;
  }
}
@include media-breakpoint-up(lg) {
  .card_text_container .card_title {
    font-size: 21px;
    padding: 1rem 1.3rem 0 1.3rem;
  }
  .card_subtitle {
    font-size: 17px;
  }
  .card_text_container {
    min-height: 10rem;
  }
}

@include media-breakpoint-up(xxl) {
  .card_text_container {
    padding: 1rem 2rem;
  }
}
</style>
