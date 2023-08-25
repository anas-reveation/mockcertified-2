<template>
  <div class="background">
    <div>
      <div class="text-center py-3 head">
        <p>
          <span class="span_blue_color font_family_aileron">Fresh Perspectives:</span>
          <br />
          <span class="text_color">Check Out Our Latest Blogs!</span>
        </p>
      </div>

      <!-- CARDS -->

      <div class="row">
        <div v-for="(data, i) in perspectiveData" :key="i" class="col-4 cards">
          <img class="w-100" :src="$urlFor(data?.images[0]?.image?.asset?._ref).url()" :alt="data?.images[0]?.alt" />
          <!-- <SanityImage
              :asset-id="data.images[0].image.asset._ref"
              auto="format"
            /> -->
          <div class="cards_caption_text">
            <p class="font_family_aileron card_title">{{data?.title}}</p>
            <p class="font_family_montserrat">{{data?.subtitle}}</p>
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
      perspectiveData: [],
      isFetched: false,
    };
  },

  async mounted() {
    const query = groq`*[_type == "perspective"] | order( _updatedAt asc) {_createdAt, images, title, subtitle }`;
    this.perspectiveData = await this.$sanity.fetch(query);
    this.isFetched = true;
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.background {
  background: linear-gradient(to top left, #deecdd, #728adc, #f3f1f6, #f3f1f6);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

* {
  margin: 0;
  padding: 0;
}

.head p {
  font-size: 20px !important;
}

.text_color {
  color: #555657 !important;
}
.cards {
  height: 33rem !important;
  position: relative;
}

.cards img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.cards_caption_text {
  background-color: #f2f2f2ab;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  height: 9rem;
}

.cards_caption_text .card_title {
  font-size: 16px;
  font-weight: 500;
}
.cards_caption_text p {
  font-size: 8px !important;
}

@include media-breakpoint-up(sm) {
  .cards_caption_text p {
    font-size: 12px !important;
  }
}
@include media-breakpoint-up(md) {
  .head h1 {
    font-size: 55px !important;
  }
  .cards_caption_text p {
    font-size: 15px !important;
  }
}
@include media-breakpoint-up(lg) {
  .head p {
    font-size: 55px !important;
  }
  .cards_caption_text p {
    font-size: 15px !important;
  }
  .cards {
    height: 30rem !important;
  }
  .cards_caption_text {
    height: 7rem;
  }
}
</style>