<template>
  <div class="container-fluid">
    <span class="fs-2 fw-bold d-block"></span>
    <div
      class="mt-2 w-100 d-flex justify-content-center"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <button
        :class="
          attemptedOpen
            ? 'btn tabs btn-active-color shadow flex-fill p-2'
            : 'btn tabs flex-fill p-2'
        "
        @click="changeTab('attempted')"
      >
        Attempted
      </button>

      <button
        :class="
          allTestOpen ? 'btn tabs btn-active-color shadow flex-fill p-2' : 'btn tabs flex-fill p-2'
        "
        @click="changeTab('all')"
      >
        All Tests
      </button>
    </div>
    <div class="mt-3">
      <div v-if="attemptedOpen">
        <div
          class="btn shadow w-100 d-flex justify-content-between align-items-center"
          @click="seeResult"
        >
          <img
            src="https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010__340.jpg"
            width="70"
            height="70"
            alt=""
          />
          <div class="d-flex flex-column">
            <span class="fs-5 fw-bolder">Test 4</span>
            <span class="fs-6 fw-normal">40 min</span>
          </div>
          <div class="d-flex flex-column">
            <!-- <img src="@/assets/images/plus.png" class="m-auto" width="25" height="25" alt="" /> -->
            <span
              class="fs-5 fw-bolder text-success d-flex justify-content-between align-items-center mx-auto"
              >60%</span
            >
          </div>
        </div>
        <div class="btn shadow w-100 d-flex justify-content-between align-items-center">
          <img
            src="https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010__340.jpg"
            width="70"
            height="70"
            alt=""
          />
          <div class="d-flex flex-column">
            <span class="fs-5 fw-bolder">Test 4</span>
            <span class="fs-6 fw-normal">40 min</span>
          </div>
          <div class="d-flex flex-column">
            <!-- <img src="@/assets/images/plus.png" class="m-auto" width="25" height="25" alt="" /> -->
            <span
              class="fs-5 fw-bolder text-success d-flex justify-content-between align-items-center mx-auto"
              >74%</span
            >
          </div>
        </div>
      </div>
      <div v-if="allTestOpen">
        <div class="btn shadow w-100 d-flex justify-content-between align-items-center">
          <img
            src="https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010__340.jpg"
            width="70"
            height="70"
            alt=""
          />
          <div class="d-flex flex-column">
            <span class="fs-5 fw-bolder">Test 4</span>
            <span class="fs-6 fw-normal">40 min</span>
          </div>
          <div class="d-flex flex-column">
            <!-- <img src="@/assets/images/plus.png" class="m-auto" width="25" height="25" alt="" /> -->
            <span
              class="fs-6 fw-bolder text-success d-flex justify-content-between align-items-center mx-auto"
              >Attempted</span
            >
          </div>
        </div>
        <div class="btn shadow w-100 d-flex justify-content-between align-items-center">
          <img
            src="https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010__340.jpg"
            width="70"
            height="70"
            alt=""
          />
          <div class="d-flex flex-column">
            <span class="fs-5 fw-bolder">Test 4</span>
            <span class="fs-6 fw-normal">40 min</span>
          </div>
          <div class="d-flex flex-column">
            <!-- <img src="@/assets/images/plus.png" class="m-auto" width="25" height="25" alt="" /> -->
            <span
              class="fs-6 fw-bolder text-success d-flex justify-content-between align-items-center mx-auto"
              >Attempted</span
            >
          </div>
        </div>

        <div class="btn shadow w-100 d-flex justify-content-between align-items-center">
          <img
            src="https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010__340.jpg"
            width="70"
            height="70"
            alt=""
          />
          <div class="d-flex flex-column">
            <span class="fs-5 fw-bolder">Test 4</span>
            <span class="fs-6 fw-normal">40 min</span>
          </div>
          <div class="d-flex flex-column">
            <!-- <img src="@/assets/images/plus.png" class="m-auto" width="25" height="25" alt="" /> -->
            <span
              @click="attempt"
              class="fs-6 fw-bolder text-danger d-flex justify-content-between align-items-center mx-auto"
              >Attempt
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { API } from 'aws-amplify';
import { getUser, listQuestions } from '../graphql/queries';
export default {
  data() {
    return {
      currentUser: {},
      attemptedOpen: true,
      allTestOpen: false,
    };
  },
  computed: {
    ...mapState('auth', ['user']),
  },
  mounted() {
    console.log(this.user.data.getUser);
  },
  methods: {
    changeTab(tabName) {
      if (tabName === 'attempted') {
        this.attemptedOpen = true;
        this.allTestOpen = false;
      }
      if (tabName === 'all') {
        this.attemptedOpen = false;
        this.allTestOpen = true;
      }
    },
    attempt() {
      this.$router.push('/attempt');
    },
    seeResult() {
      this.$router.push('/result');
    },
  },
};
</script>

<style scoped>
.btn-active-color {
  background-color: #11a49b !important;
  color: white !important;
}
.btn-color {
  color: black !important;
}
.btn-outline-primary {
  outline-color: #11a49b !important;
}
.tabs {
  border: 1px solid rgb(143, 142, 142);
}
.result-circle {
  width: 50px;
  height: 50px;
  border: 1px solid rgb(156, 155, 155);
  border-radius: 50%;
}
</style>
