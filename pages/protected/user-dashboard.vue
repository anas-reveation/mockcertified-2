<template>
  <div>
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
                    href="#balance"
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
                    href="#certificate"
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
                    href="#support"
                  >
                    <img src="~assets/images/support.svg" alt="BellSimple" class="category_icon" />
                    <p class="mb-0 ms-4 fw-bold font_familly_nunito">Support</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="d-flex align-items-center my-3 nav-link"
                    data-bs-toggle="tab"
                    href="#alexa"
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

              <h5 class="font_size_28 text-center mt-4 mb-3 fw-bolder font_family_aileron">
                LOGOUT
              </h5>
            </div>
          </div>
          <div class="col-9">
            <h4 class="underline fw-bolder my-4 font_family_nunito">Overview</h4>
            <div class="row">
              <div class="col-7">
                <div class="rounded bg-white shadow-box p-4">
                  <div class="tab-content">
                    <div class="tab-pane container fade" id="test">
                      <UserDashboardTest />
                    </div>
                    <div class="tab-pane container fade" id="balance">
                      <UserDashboardBalance />
                    </div>
                    <div class="tab-pane container fade" id="support">
                      <UserDashboardSupport />
                    </div>
                    <div class="tab-pane container fade" id="certificate">
                      <UserDashboardCertificates />
                    </div>
                    <div class="tab-pane container fade" id="alexa">
                      <UserDashboardAlexa />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-5" v-if="recentlyAddedTests.length">
                <div class="rounded bg-white shadow-box p-3">
                  <h5 class="mb-4 font_family_nunito fw-bolder my-5">Last Test Added</h5>
                  <div v-for="(test, index) in recentlyAddedTests" :key="index">
                    <NuxtLink :to="`/category/test/${test.slug}`">
                      <div
                        class="d-flex border justify-content-between px-3 align-items-center rounded py-3 my-4"
                      >
                        <p class="m-0">{{ test.title }}</p>
                      </div>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <UserDashboardBottomBanner />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  middleware: ['authenticated'],

  data() {
    return {
      userId: this.$route.params.userId,
      firstName: this.$route.params.firstName,
      lastName: this.$route.params.lastName,
      isFetched: false,
    };
  },

  computed: {
    ...mapState('testManagement', ['recentlyAddedTests']),
  },

  async mounted() {
    if (!this.recentlyAddedTests.length) {
      await this.getRecentlyAddedTests();
    }
    this.isFetched = true;
    if (this.isFetched) {
      this.activateTestTab();
    }
  },

  methods: {
    activateTestTab() {
      this.$nextTick(() => {
        const testTab = this.$refs.testTab; // Reference to the "Test" tab
        if (testTab) {
          testTab.click();
          // Programmatically click the tab to activate it
        }
      });
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
