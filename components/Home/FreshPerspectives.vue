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
        <div v-for="(data, i) in perspectiveData" :key="i" class="col-4 d-none d-md-block cards">
          <a :href="data.link" target="_blank">
            <img
              class="w-100 h-100"
              :src="$urlFor(data?.images[0]?.image?.asset?._ref).url()"
              :alt="data?.images[0]?.alt"
            />
            <div class="cards_caption_text">
              <p class="font_family_aileron card_title">{{ data?.title }}</p>
              <p class="font_family_montserrat">{{ data?.subtitle }}</p>
            </div>
          </a>
        </div>

        <!--Cards Mobile UI -->

        <div
          v-for="(data, index) in perspectiveData"
          :key="data?.title"
          :class="['my-2', 'd-block', 'd-md-none', 'mobile_card', `bg-${index + 1}`]"
        >
          <a :href="data.link" target="_blank">
            <div data-aos="zoom-in-up" class="row align-items-center mobile">
              <div class="col-2 col-sm-2">
                <img
                  class="w-100 h-100"
                  :src="$urlFor(data?.images[0]?.image?.asset?._ref).url()"
                  :alt="data?.images[0]?.alt"
                />
              </div>
              <div class="col-9 col-sm-8 px-2 px-sm-4 cards_caption_text">
                <p class="font_family_aileron card_title">{{ data?.title }}</p>
                <p class="font_family_montserrat pt-2">{{ data?.subtitle }}</p>
              </div>
            </div>
          </a>
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
    const query = groq`*[_type == "perspective"] | order( _updatedAt asc) {_createdAt, images, title, subtitle, link }`;
    this.perspectiveData = await this.$sanity.fetch(query);
    console.log(this.perspectiveData);
    this.isFetched = true;
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.mobile_card {
  &.bg-1 .mobile {
    background: linear-gradient(to right, rgb(221 228 226), rgb(126 126 126 / 38%));
  }
  &.bg-2 .mobile {
    background: linear-gradient(to right, #edeaeb, #c3bec7);
  }

  &.bg-3 .mobile {
    background: linear-gradient(to right, #cad6d673, #cad6d6);
  }
}
.background {
  background: linear-gradient(to top left, #deecdd, #728adc, #f3f1f6, #f3f1f6);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.head p {
  font-size: 20px;
}

.head .text_color {
  color: #555657 !important;
}

.cards_caption_text {
  font-weight: 600;
}
.cards_caption_text .card_title {
  font-size: 11px !important;
  font-weight: 500;
}
.cards_caption_text p {
  font-size: 9px !important;
}

@include media-breakpoint-up(sm) {
  .head p {
    font-size: 25px !important;
  }
  .cards_caption_text .card_title {
    font-size: 17px !important;
  }
  .cards_caption_text p {
    font-size: 15px !important;
  }
}
@include media-breakpoint-up(md) {
  .cards {
    height: 20rem !important;
    position: relative;
  }

  .head p {
    font-size: 35px !important;
  }
  .cards_caption_text {
    background-color: #f2f2f2ab;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    height: 9rem;
  }
  .cards_caption_text p {
    font-size: 15px !important;
  }
}
@include media-breakpoint-up(lg) {
  .head p {
    font-size: 55px !important;
  }
  .cards_caption_text {
    padding: 20px;
  }
  .cards_caption_text p {
    font-size: 15px !important;
  }
  .cards {
    height: 25rem !important;
  }
  .cards_caption_text {
    height: 7rem;
  }
}
</style>
