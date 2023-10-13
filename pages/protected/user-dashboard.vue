<template>
  <div class="bg_blue">
    <div class="container py-5">
      <div class="mt-5" v-if="!isFetched">
        <AnimatedPlaceholder class="rounded-3 p-2 me-2" width="300px" />
        <br />
        <AnimatedPlaceholder class="btn mt-4" width="200px" />
      </div>
      <div class="row" v-if="isFetched">
        <div class="col-3">
          <div class="rounded bg-white shadow-box p-3">
            <div class="d-flex align-items-center">
              <div class="col-2 bg-primary text-white circle">
                <p
                  class="mt-2 text-uppercase d-flex justify-content-center fw-bolder font_family_nunito"
                >
                  {{ firstName[0] }}{{ lastName[0] }}
                </p>
              </div>
              <h5 class="m-0 fw-bolder ms-3 font_size_24 font_family_montserrat">
                {{ firstName }}
              </h5>
            </div>
            <p class="font_size_14 my-4">Menu</p>

            <!-- Tab panes -->

            <ul class="nav nav-tabs">
              <li class="nav-item">
                <a
                  class="d-flex align-items-center my-3 nav-link active"
                  data-bs-toggle="tab"
                  href="#test"
                >
                  <img src="~assets/images/our_test.svg" alt="BellSimple" class="category_icon" />

                  <p class="mb-0 ms-4 fw-bold font_familly_nunito">Your Tests</p>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="d-flex align-items-center my-3 nav-link"
                  data-bs-toggle="tab"
                  href="#test"
                  ref="testTab"
                >
                  <img src="~assets/images/balance.svg" alt="BellSimple" class="category_icon" />
                  <p class="mb-0 ms-4 fw-bold font_familly_nunito">Balance</p>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="d-flex align-items-center my-3 nav-link"
                  data-bs-toggle="tab"
                  href="#test"
                >
                  <img
                    src="~assets/images/certificate_1.svg"
                    alt="BellSimple"
                    class="category_icon"
                  />
                  <p class="mb-0 ms-4 fw-bold font_familly_nunito">Certificates</p>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="d-flex align-items-center my-3 nav-link"
                  data-bs-toggle="tab"
                  href="#test"
                >
                  <img src="~assets/images/support.svg" alt="BellSimple" class="category_icon" />
                  <p class="mb-0 ms-4 fw-bold font_familly_nunito">Support</p>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="d-flex align-items-center my-3 nav-link"
                  data-bs-toggle="tab"
                  href="#test"
                >
                  <img src="~assets/images/alexa_1.svg" alt="BellSimple" class="category_icon" />
                  <p class="mb-0 ms-4 fw-bold font_familly_nunito">Alexa</p>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="d-flex align-items-center my-3 nav-link"
                  data-bs-toggle="tab"
                  href="#test"
                >
                  <img src="~assets/images/setting.svg" alt="BellSimple" class="category_icon" />
                  <p class="mb-0 ms-4 fw-bold font_familly_nunito">Settings</p>
                </a>
              </li>
            </ul>

            <!-- Tab panes -->

            <h5 class="font_size_28 text-center mt-4 mb-3 fw-bolder font_family_aileron">LOGOUT</h5>
          </div>
        </div>
        <div class="col-9">
          <h4 class="underline fw-bolder my-4 font_family_nunito">Overview</h4>
          <div class="row">
            <div class="col-8">
              <div class="rounded bg-white shadow-box p-4">
                <div class="tab-content">
                  <div class="tab-pane container fade" id="test">
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
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="rounded bg-white shadow-box p-3">
                <h5 class="mb-4 font_family_nunito fw-bolder my-5">Last Test Added</h5>

                <div
                  v-for="i in 5"
                  class="d-flex border justify-content-between px-3 align-items-center rounded py-3 my-4"
                >
                  <p class="m-0">test Added</p>
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
      userId: this.$route.params.userId,
      firstName: this.$route.params.firstName,
      lastName: this.$route.params.lastName,
      balanceDetail: null,
      isFetched: false,
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
    if (this.isFetched) {
      this.activateTestTab();
    }
  },

  methods: {
    ...mapActions('dashboard', ['getTestData']),
    ...mapActions('seller', ['getBalanceDetail']),

    activateTestTab() {
      this.$nextTick(() => {
        const testTab = this.$refs.testTab; // Reference to the "Test" tab
        if (testTab) {
          testTab.click();
          // Programmatically click the tab to activate it
        }
      });
    },
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

<style>
.shadow-box {
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.09);
}

.circle {
  border-radius: 50%;
  height: 50px;
  width: 50px;
}
.category_icon {
  height: 35px;
  width: 35px;
}
.rounded_border {
  border-radius: 20px;
}
.bg_blue {
  background-color: #edecec;
}
</style>
