<template>
  <div class="container">
    <h1 class="mt-5 mb-4 font_size_36 col-md-12 col-md-6">Admin Panel</h1>

    <NuxtLink
      to="/protected/admin/category/add-category"
      class="btn btn-primary text-white mb-2 font_size_16"
    >
      <span class="font_size_16"> Add Category </span>
    </NuxtLink>
    <NuxtLink to="/protected/admin/category" class="btn btn-primary text-white mb-2">
      <span class="font_size_16"> Update Category </span>
    </NuxtLink>

    <div class="mb-2 d-flex justify-content-center justify-content-sm-end">
      <div
        class="p-1 m-1 cursor_pointer sorting_text_size"
        :class="isInProgressOpen ? 'text-primary' : 'text-dark'"
        @click="changeTabName('isInProgressOpen')"
      >
        Pending
        <div v-if="isInProgressOpen" class="bg-primary mt-0 blue_underline" />
      </div>
      <div
        class="p-1 m-1 cursor_pointer sorting_text_size"
        :class="isApprovedOpen ? 'text-primary' : 'text-dark'"
        @click="changeTabName('isApprovedOpen')"
      >
        Approved
        <div v-if="isApprovedOpen" class="bg-primary mt-0 blue_underline" />
      </div>
      <div
        class="p-1 m-1 cursor_pointer sorting_text_size"
        :class="isRejectedOpen ? 'text-primary' : 'text-dark'"
        @click="changeTabName('isRejectedOpen')"
      >
        Rejected
        <div v-if="isRejectedOpen" class="bg-primary mt-0 blue_underline" />
      </div>
    </div>

    <div v-if="isLoaderHidden" class="row">
      <div v-for="i in 3" :key="i" class="col-sm-6 col-md-4 mb-3" data-aos="flip-right">
        <TestCardsSkeleton />
      </div>
    </div>

    <div v-if="!isLoaderHidden && !filteredTests.length" class="mt-4 px-3">
      <h2>No Test Available</h2>
    </div>

    <div class="row">
      <div
        v-for="test in filteredTests"
        :key="test.id"
        class="col-sm-6 col-md-4 mb-3"
        data-aos="flip-right"
      >
        <NuxtLink :to="`/protected/admin/test/${test.slug}`">
          <TestCards
            :title="test.title"
            :price="`$${formatPrice(test.price)}`"
            :description="`${test.time_limit} mins • ${
              test.questions.items.length
            } questions • ${totalMarks(test.questions.items)} marks`"
            :dateTime="getDate(test.createdAt)"
          />
        </NuxtLink>
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
      title: 'Admin Dashboard',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Check and review all the tests creted by admin. It is categorized as pending, approved, and rejected.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Admin Dashboard - Mockcertified App',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Check and review all the tests creted by admin. It is categorized as pending, approved, and rejected.',
        },
        {
          name: 'keywords',
          content: 'Admin Dashboard, Mockcertified App',
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
          content: 'Admin Dashboard - Mockcertified App',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Check and review all the tests creted by admin. It is categorized as pending, approved, and rejected.',
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
      filteredTests: [],
    };
  },

  computed: {
    ...mapState(['isLoading', 'isLoaderHidden']),
    ...mapState('admin', ['allTests']),

    approvedTests() {
      return this.allTests.filter((test) => test.status === 'APPROVED');
    },

    inProgressTests() {
      return this.allTests.filter((test) => test.status === 'IN_PROGRESS');
    },

    rejectedTests() {
      return this.allTests.filter((test) => test.status === 'REJECTED');
    },
  },

  async mounted() {
    this.setIsLoaderHidden(true);
    await this.getAllTests();
    this.changeTabName('isInProgressOpen');
    this.setIsLoaderHidden(false);
  },

  methods: {
    ...mapMutations(['setIsLoaderHidden']),
    ...mapActions('admin', ['getAllTests']),

    changeTabName(tabName) {
      if (tabName === 'isApprovedOpen') {
        this.isApprovedOpen = true;
        this.isInProgressOpen = false;
        this.isRejectedOpen = false;
        this.filteredTests = this.approvedTests;
      } else if (tabName === 'isInProgressOpen') {
        this.isInProgressOpen = true;
        this.isApprovedOpen = false;
        this.isRejectedOpen = false;
        this.filteredTests = this.inProgressTests;
      } else if (tabName === 'isRejectedOpen') {
        this.isRejectedOpen = true;
        this.isApprovedOpen = false;
        this.isInProgressOpen = false;
        this.filteredTests = this.rejectedTests;
      }
    },

    totalMarks(questionsArr) {
      let totalMarks = 0;
      questionsArr.map((ques) => {
        totalMarks += ques.marks;
      });
      return totalMarks;
    },

    formatPrice(price) {
      return parseFloat(price).toFixed(2);
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

@include media-breakpoint-up(sm) {
  .width_res {
    width: 25% !important;
    margin-left: auto;
  }
}

@include media-breakpoint-down(sm) {
  .sorting_text_size {
    font-size: 14px;
  }
}
</style>
