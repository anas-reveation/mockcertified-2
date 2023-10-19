<template>
  <div>
    <P class="text-end font_style_20 font_family_nunito fw-bolder"
      >Current Balance : $ {{ balanceDetail }}</P
    >
    <div class="d-flex flex-column">
      <div class="mb-4" v-if="userTestData?.purchased_tests?.items?.length">
        <NuxtLink to="/protected/purchased-test">
          <div
            @mouseover="isHovered1 = true"
            @mouseout="isHovered1 = false"
            :class="{ 'bg-primary': isHovered1, 'text-white': isHovered1 }"
            class="d-flex shadow-box justify-content-between px-4 py-5 align-items-center rounded_border"
          >
            <h2 class="fw-bolder font_family_aieron">
              {{ userTestData?.purchased_tests?.items?.length }}
            </h2>
            <p class="font_family_nunito">Tests Bought</p>
          </div>
        </NuxtLink>
      </div>
      <div class="mb-4" v-if="userTestData?.created_tests?.items?.length">
        <NuxtLink to="/protected/create-test">
          <div
            @mouseover="isHovered2 = true"
            @mouseout="isHovered2 = false"
            :class="{ 'bg-primary': isHovered2, 'text-white': isHovered2 }"
            class="d-flex shadow-box justify-content-between px-4 py-5 align-items-center rounded_border"
          >
            <h2 class="fw-bolder font_family_aieron">
              {{ userTestData?.created_tests?.items?.length }}
            </h2>
            <p class="font_family_nunito">Tests Created</p>
          </div>
        </NuxtLink>
      </div>
      <div class="mb-4" v-if="userTestData?.attempted_tests?.items?.length">
        <NuxtLink to="/protected/attempted-test">
          <div
            @mouseover="isHovered3 = true"
            @mouseout="isHovered3 = false"
            :class="{ 'bg-primary': isHovered3, 'text-white': isHovered3 }"
            class="d-flex shadow-box justify-content-between px-4 py-5 align-items-center rounded_border"
          >
            <h2 class="fw-bolder font_family_aieron">
              {{ userTestData?.attempted_tests?.items?.length }}
            </h2>
            <p class="font_family_nunito">Tests Attempted</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  middleware: ['authenticated'],

  data() {
    return {
      isHovered1: false,
      isHovered2: false,
      isHovered3: false,
      userTestData: {},
      hoveredCard: null,
      balanceDetail: null,
    };
  },

  computed: {
    ...mapState('dashboard', ['testCollection']),
  },

  async mounted() {
    if (this.$route.params.userId && !this.testCollection.length) {
      await this.getTestData(`${this.$route.params.userId}`);
    }
    await this.getBalanceLocal1();

    this.userTestData = this.testCollection;
    this.isFetched = true;
  },

  methods: {
    ...mapActions('dashboard', ['getTestData']),
    ...mapActions('seller', ['getBalanceDetail']),

    async getBalanceLocal1() {
      const res = await this.getBalanceDetail();
      if (res) {
        this.balanceDetail = parseFloat(res.amount) / 100;
        this.balanceDetail = parseFloat(this.balanceDetail).toFixed(2);
      }
    },
  },
};
</script>
