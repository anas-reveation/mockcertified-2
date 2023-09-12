<template>
  <div class="background">
    <div class="container py-5">
      <div class="head">
        <h1 class="text-center fw-bold font_family_dmsans">
          Go Easy On Your  <span class="span_blue_color">Wallet.</span>
        </h1>
        <div class="my-4 input_container">
          <input class="font_family_dmsans" type="text" v-model="walletInputText" />
          <i class="fa-solid fa-magnifying-glass search_btn"></i>
        </div>
      </div>

      <div class="row align-items-center">
        <div data-aos="fade-up" v-for="(data, i) in walletData" :key="i" class="col-12 col-md-7">
          <div class="my-4" v-for="(imageData, i) in data?.images" :key="i">
            <img
            class="w-100"
            :src="$urlFor(imageData?.image?.asset?._ref).url()"
            :alt="imageData?.alt"
          />
          </div>
        </div>
        <div data-aos="fade-down" class="col-12 col-md-5 my-5">
          <ul>
            <li class="mb-1 mb-md-5 pb-5">
              <div class="timeline">
                <p class="font_family_aileron">
                  <span class="span_blue_color">MockCertified</span> offers tests at very
                  budget-friendly prices.
                </p>
              </div>
            </li>

            <li class="mb-1 mb-md-5 pb-5">
              <div class="timeline">
                <p class="font_family_aileron">
                  Project Management Tests at only $<span class="span_blue_color">9.99</span>
                  !
                </p>
              </div>
            </li>

            <li>
              <div class="timeline">
                <p class="font_family_aileron">With the uptimelined 2023 format.</p>
              </div>
            </li>
          </ul>
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
      walletData: [],
      walletInputText: '',
      isFetched: false,
    };
  },

  async mounted() {
    const query = groq`*[_type == "wallet"] | order( _updatedAt asc){ inputTitle, images }`;
    this.walletData = await this.$sanity.fetch(query);
    console.log(this.walletData)
    this.walletInputText = this.walletData[0]?.inputTitle;
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
  background: linear-gradient(to top left, #d6cdea, #c9d3f1, #f4f2f7, #ddebdc);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: rgb(0, 0, 0);
}

.head h1 {
  font-size: 35px;
}
.input_container {
  position: relative;
  left: 50%;
  transform: translate(-50%);
  width: 80%;
}
input:focus {
  outline: none;
}

input {
  width: 100%;
  padding: 15px 30px;
  font-size: 12px;
  border: none;
  border-radius: 50px;
  font-weight: 500;
  position: relative;
}

.search_btn {
  position: absolute;
  right: 20px;
  font-size: 15px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background: white;
  padding: 0 0 0 10px;
}

.timeline p {
  margin-bottom: 0;
}

ul {
  display: grid;
  grid-template-columns: 0.25rem 1fr;
  grid-auto-columns: max-content;
  column-gap: 2rem;
  list-style: none;
  width: min(100%);
  margin-inline: auto;
}

ul::before {
  content: '';
  grid-column: 1;
  grid-row: 1 / span 15;
  background: rgb(0, 0, 0);
}

ul li .timeline {
  height: 3rem;
  height: 0;
  text-align: left;
  display: grid;
  align-content: left;
  justify-content: left;
  place-content: left;
  position: relative;
  font-size: 25px;
  display: flex;
  align-items: center;
}

ul li .timeline::after {
  content: '';
  position: absolute;
  width: 30px;
  aspect-ratio: 1;
  background: rgb(0, 0, 0);
  border: 4px solid white;
  border-radius: 50%;
  top: 50%;
  transform: translate(50%, -50%);
  left: -72px;
}

ul li .timeline p {
  font-size: 16px;
}

@include media-breakpoint-up(md) {
  .head h1 {
    font-size: 55px;
  }

  .input_container {
    width: 50%;
  }
  input {
    width: 100%;
    padding: 25px 30px;
    font-size: 16px;
  }

  .search_btn {
    position: absolute;
    right: 20px;
    font-size: 35px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    background: white;
    padding: 0 0 0 10px;
  }
}

@include media-breakpoint-up(lg) {
  ul li .timeline p {
    font-size: 25px;
  }
}
</style>