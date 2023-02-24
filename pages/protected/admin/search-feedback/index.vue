<template>
  <div class="container">
    <h1 class="text-primary fw-bolder mt-5 mb-4 font_size_32 search_title_size">Search Feedback</h1>

    <div class="mb-2 d-flex justify-content-center justify-content-sm-end">
      <div
        class="p-1 ps-lg-3 m-1 cursor_pointer font_size_16"
        :class="isInProgressOpen ? 'text-primary' : 'text-dark'"
        @click="changeTabName('isInProgressOpen')"
      >
        Pending
        <div v-if="isInProgressOpen" class="bg-primary mt-0 blue_underline" />
      </div>
      <div
        class="p-1 ps-lg-3 m-1 cursor_pointer font_size_16"
        :class="isApprovedOpen ? 'text-primary' : 'text-dark'"
        @click="changeTabName('isApprovedOpen')"
      >
        Approved
        <div v-if="isApprovedOpen" class="bg-primary mt-0 blue_underline" />
      </div>
      <div
        class="p-1 ps-lg-3 m-1 cursor_pointer font_size_16"
        :class="isRejectedOpen ? 'text-primary' : 'text-dark'"
        @click="changeTabName('isRejectedOpen')"
      >
        Rejected
        <div v-if="isRejectedOpen" class="bg-primary mt-0 blue_underline" />
      </div>
    </div>

    <div v-if="isLoaderHidden" class="mt-5 mb-4">
      <AnimatedPlaceholder width="150px" height="16px" />

      <br />
      <div v-for="i in 3" :key="i" class="mt-3">
        <AnimatedPlaceholder width="150px" height="16px" />
        <br />
        <AnimatedPlaceholder width="100px" height="16px" />
        <br />
        <AnimatedPlaceholder width="100%" height="100px" class="mt-3" />
      </div>
    </div>

    <div v-if="!isLoaderHidden && !filteredSearchFeedback.length" class="mt-4 px-3">
      <h2 class="font_size_32 search_title_size">No Search Feedback Available</h2>
    </div>

    <div v-for="(searchFeedback, index) in filteredSearchFeedback" :key="index" class="mb-4">
      <div class="fw-bolder text-break font_size_20 feedback_username">
        {{ searchFeedback.user_email }}
      </div>
      <div class="text-muted mt-1 font_size_14">{{ getDate(searchFeedback.createdAt) }}</div>

      <div class="mt-2">
        <div class="p-2 feedback_card">
          <div class="font_size_14">
            {{ searchFeedback.description }}
          </div>

          <div v-if="searchFeedback.status === 'IN_PROGRESS'" class="mt-2">
            <div class="d-sm-flex justify-content-end">
              <div
                class="btn btn-primary text-white mt-1 me-1"
                @click="approvedRejectSearchFeedback('approve', searchFeedback.id)"
              >
                <span class="font_size_14"> Approve </span>
              </div>
              <div
                class="btn btn-outline-danger mt-1"
                @click="approvedRejectSearchFeedback('reject', searchFeedback.id)"
              >
                <span class="font_size_14"> Reject </span>
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

  head() {
    return {
      title: 'Search Our Feedback',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Check out the Feedback section on Mockcertified for more information and how it can help you ace your certification exams. Plus, read feedback from our users.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Search Our Feedback - Mockcertified App',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Check out the Feedback section on Mockcertified for more information and how it can help you ace your certification exams. Plus, read feedback from our users.',
        },
        {
          name: 'keywords',
          content:
            'Search feedback, feedback search, mock feedback, mock exam feedback, mock test feedback',
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `https://${process.env.DOMAIN}${require('~/assets/images/logo_with_name.svg')}`,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://${process.env.DOMAIN}/${this.$router.currentRoute.name}`,
        },

        // Twitter Meta Tags
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Search Our Feedback - Mockcertified App',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Check out the Feedback section on Mockcertified for more information and how it can help you ace your certification exams. Plus, read feedback from our users.',
        },

        {
          hid: 'twitter:domain',
          property: 'twitter:domain',
          content: process.env.DOMAIN,
        },
        {
          hid: 'twitter:url',
          property: 'twitter:url',
          content: `https://${process.env.DOMAIN}/${this.$router.currentRoute.name}`,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: `https://${process.env.DOMAIN}${require('~/assets/images/logo_with_name.svg')}`,
        },
      ],
    };
  },

  data() {
    return {
      isApprovedOpen: false,
      isInProgressOpen: false,
      isRejectedOpen: false,
      noTest: false,
      allSearchFeedback: [],
      filteredSearchFeedback: [],
    };
  },

  computed: {
    ...mapState(['isLoading', 'isLoaderHidden']),
    ...mapState('admin', ['allTests']),

    approvedTests() {
      return this.allSearchFeedback.filter((test) => test.status === 'APPROVED');
    },

    inProgressTests() {
      return this.allSearchFeedback.filter((test) => test.status === 'IN_PROGRESS');
    },

    rejectedTests() {
      return this.allSearchFeedback.filter((test) => test.status === 'REJECTED');
    },
  },

  async mounted() {
    this.setIsLoaderHidden(true);
    this.allSearchFeedback = await this.getAllSearchFeedbacks();
    this.changeTabName('isInProgressOpen');
    this.setIsLoaderHidden(false);
  },

  methods: {
    ...mapMutations(['setIsLoaderHidden']),
    ...mapActions('admin', ['getAllSearchFeedbacks', 'approveRejectSearchFeedback']),

    changeTabName(tabName) {
      if (tabName === 'isApprovedOpen') {
        this.isApprovedOpen = true;
        this.isInProgressOpen = false;
        this.isRejectedOpen = false;
        this.filteredSearchFeedback = this.approvedTests;
      } else if (tabName === 'isInProgressOpen') {
        this.isInProgressOpen = true;
        this.isApprovedOpen = false;
        this.isRejectedOpen = false;
        this.filteredSearchFeedback = this.inProgressTests;
      } else if (tabName === 'isRejectedOpen') {
        this.isRejectedOpen = true;
        this.isApprovedOpen = false;
        this.isInProgressOpen = false;
        this.filteredSearchFeedback = this.rejectedTests;
      }
    },

    async approvedRejectSearchFeedback(approveReject, searchFeedbackID) {
      if (approveReject === 'approve') {
        const res = await this.$swal.fire({
          title: 'Do you want to approve the Search Feedback?',
          showCancelButton: true,
          confirmButtonText: 'Yes',
        });
        if (!res.isConfirmed) {
          return;
        }

        const res2 = await this.approveRejectSearchFeedback({
          searchFeedbackID,
          status: approveReject,
        });
        if (res2) {
          this.$swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Search Feedback Approved',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 7000,
          });

          this.allSearchFeedback = this.allSearchFeedback.map((test) =>
            test.id === searchFeedbackID
              ? {
                  ...test,
                  status: 'APPROVED',
                }
              : test,
          );

          this.changeTabName('isApprovedOpen');
        }
      } else if (approveReject === 'reject') {
        const res = await this.$swal.fire({
          title: 'Do you want to reject the Search Feedback?',
          showCancelButton: true,
          confirmButtonText: 'Yes',
        });
        if (!res.isConfirmed) {
          return;
        }
        const res2 = await this.approveRejectSearchFeedback({
          searchFeedbackID,
          status: approveReject,
        });

        if (res2) {
          this.$swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Search Feedback Rejected',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 7000,
          });

          this.allSearchFeedback = this.allSearchFeedback.map((test) =>
            test.id === searchFeedbackID
              ? {
                  ...test,
                  status: 'REJECTED',
                }
              : test,
          );

          this.changeTabName('isRejectedOpen');
        }
      }
    },

    getDate(getdatetime) {
      var dateStr = new Date(getdatetime);
      return dateStr.toLocaleDateString();
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint';

.blue_underline {
  height: 2px;
  background: #6782e1;
}

.feedback_card {
  background: #f5f5f5;
  word-wrap: break-word;
}

.btn_size {
  width: 200px;
}

@include media-breakpoint-down(sm) {
  .search_title_size {
    font-size: 24px;
  }
}

@include media-breakpoint-down(lg) {
  .feedback_username {
    font-size: 18px;
  }
}
</style>
