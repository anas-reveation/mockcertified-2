<template>
  <div :class="startTest === true ? 'mx-3 mt-5 text-left ' : ' '">
    <div v-if="startTest" class="container">
      <div class="d-flex flex-row justify-content-between align-items-center pb-5">
        <img src="@/assets/images/previous.png" width="30" @click="goBack" alt="" />

        <h2 class="text-center flex-grow-1">Test Instructions</h2>
      </div>
      <ol>
        <li class="fw-bolder">Lorem ipsum dolor sit amet consectetur itaque?</li>
        <li class="fw-bold">
          Test can be taken on devices such as Laptop/ Smart-Phone/ Tablet/ Desktop. Charge the
          Laptop / Smart Phone / Tablet well in advance to last for at least 2 hours.
        </li>
        <li class="fw-bold">
          The device should have continuous internet connectivity. Do not share the phone's hotspot
          with any other device while writing the Mock Test.
        </li>
        <li class="fw-bold">
          The student should login into the portal at least 10 minutes before the commencement of
          the examination.
        </li>
        <li class="fw-bold">
          Do NOT take photos, screen shots, hear audio, or record videos of the examination and then
          share it with others during the online examination, a remote proctor would watch such
          unwanted activities. If found doing such activities, it will be treated as malpractice.
        </li>
      </ol>
      <button type="button" class="btn w-100 mt-3 btn-color" @click="startTestFunction">
        Start Test
      </button>
    </div>

    <div v-if="startTest === false">
      <div class="pt-4 pb-2 d-flex flex-row slider sticky-top bg-white" v-if="exit">
        <div v-for="number in 10" :key="number">
          <button
            type="button"
            :class="number === count ? 'btn-square-md fs-4 btn-color' : 'btn-square-md'"
          >
            {{ number }}
          </button>
        </div>
      </div>

      <div
        class="container-fluid d-flex flex-row justify-content-between align-items-center mt-5 mb-2"
      >
        <button class="btn btn-color mb-2" @click="previous">Previous</button>
        <div>
          <img
            v-if="play === false"
            src="@/assets/images/001-play-button.png"
            width="30"
            alt=""
            @click="playToggle"
          />
          <img
            v-if="play === true"
            class="opacity-75"
            width="30"
            src="@/assets/images/002-pause.png"
            alt=""
            @click="playToggle"
          />
        </div>
        <button class="btn btn-color mb-2">3:45</button>
      </div>
      <div class="container-fluid text-left" v-if="count === 1">
        <p class="p-4 text-left question">
          <span>Q{{ count }} -</span> What is the name of the oldest tribe in the world that is
          still alive?What is the name of the oldest tribe in the world that is
        </p>
        <div class="d-flex flex-column mt-4">
          <span
            @click="chooseOption('a')"
            :class="
              optionSelected != 'a'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >A . Asaro Tribe</span
          >
          <span
            @click="chooseOption('b')"
            :class="
              optionSelected != 'b'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >B . Sentinelese Tribe of North Sentinel</span
          >
          <span
            @click="chooseOption('c')"
            :class="
              optionSelected != 'c'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >C . Samburu</span
          >
          <span
            @click="chooseOption('d')"
            :class="
              optionSelected != 'd'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >D . Kazakh Tribe</span
          >
        </div>
      </div>

      <div class="container-fluid text-left" v-if="count === 2">
        <p class="p-4 text-left question">
          <span>Q{{ count }} -</span> What is the name of the oldest tribe in the world that is
          still alive?What is the name of the oldest tribe in the world that is
        </p>
        <div class="d-flex flex-column mt-4">
          <span
            @click="chooseOption('a')"
            :class="
              optionSelected != 'a'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >A . Asaro Tribe</span
          >
          <span
            @click="chooseOption('b')"
            :class="
              optionSelected != 'b'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >B . Sentinelese Tribe of North Sentinel</span
          >
          <span
            @click="chooseOption('c')"
            :class="
              optionSelected != 'c'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >C . Samburu</span
          >
          <span
            @click="chooseOption('d')"
            :class="
              optionSelected != 'd'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >D . Kazakh Tribe</span
          >
        </div>
      </div>

      <div class="container-fluid text-left" v-if="count === 3">
        <p class="p-4 text-left question">
          <span>Q{{ count }} -</span> What is the name of the oldest tribe in the world that is
          still alive?What is the name of the oldest tribe in the world that is
        </p>
        <div class="d-flex flex-column mt-4">
          <span
            @click="chooseOption('a')"
            :class="
              optionSelected != 'a'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >A . Asaro Tribe</span
          >
          <span
            @click="chooseOption('b')"
            :class="
              optionSelected != 'b'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >B . Sentinelese Tribe of North Sentinel</span
          >
          <span
            @click="chooseOption('c')"
            :class="
              optionSelected != 'c'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >C . Samburu</span
          >
          <span
            @click="chooseOption('d')"
            :class="
              optionSelected != 'd'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >D . Kazakh Tribe</span
          >
        </div>
      </div>

      <div class="container-fluid text-left" v-if="count === 4">
        <p class="p-4 text-left question">
          <span>Q{{ count }} -</span> What is the name of the oldest tribe in the world that is
          still alive?What is the name of the oldest tribe in the world that is
        </p>
        <div class="d-flex flex-column mt-4">
          <span
            @click="chooseOption('a')"
            :class="
              optionSelected != 'a'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >A . Asaro Tribe</span
          >
          <span
            @click="chooseOption('b')"
            :class="
              optionSelected != 'b'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >B . Sentinelese Tribe of North Sentinel</span
          >
          <span
            @click="chooseOption('c')"
            :class="
              optionSelected != 'c'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >C . Samburu</span
          >
          <span
            @click="chooseOption('d')"
            :class="
              optionSelected != 'd'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >D . Kazakh Tribe</span
          >
        </div>
      </div>

      <div class="container-fluid text-left" v-if="count === 5">
        <p class="p-4 text-left question">
          <span>Q{{ count }} -</span> What is the name of the oldest tribe in the world that is
          still alive?What is the name of the oldest tribe in the world that is
        </p>
        <div class="d-flex flex-column mt-4">
          <span
            @click="chooseOption('a')"
            :class="
              optionSelected != 'a'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >A . Asaro Tribe</span
          >
          <span
            @click="chooseOption('b')"
            :class="
              optionSelected != 'b'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >B . Sentinelese Tribe of North Sentinel</span
          >
          <span
            @click="chooseOption('c')"
            :class="
              optionSelected != 'c'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >C . Samburu</span
          >
          <span
            @click="chooseOption('d')"
            :class="
              optionSelected != 'd'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >D . Kazakh Tribe</span
          >
        </div>
      </div>

      <div class="container-fluid text-left" v-if="count === 6">
        <p class="p-4 text-left question">
          <span>Q{{ count }} -</span> What is the name of the oldest tribe in the world that is
          still alive?What is the name of the oldest tribe in the world that is
        </p>
        <div class="d-flex flex-column mt-4">
          <span
            @click="chooseOption('a')"
            :class="
              optionSelected != 'a'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >A . Asaro Tribe</span
          >
          <span
            @click="chooseOption('b')"
            :class="
              optionSelected != 'b'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >B . Sentinelese Tribe of North Sentinel</span
          >
          <span
            @click="chooseOption('c')"
            :class="
              optionSelected != 'c'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >C . Samburu</span
          >
          <span
            @click="chooseOption('d')"
            :class="
              optionSelected != 'd'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >D . Kazakh Tribe</span
          >
        </div>
      </div>

      <div class="container-fluid text-left" v-if="count === 7">
        <p class="p-4 text-left question">
          <span>Q{{ count }} -</span> What is the name of the oldest tribe in the world that is
          still alive?What is the name of the oldest tribe in the world that is
        </p>
        <div class="d-flex flex-column mt-4">
          <span
            @click="chooseOption('a')"
            :class="
              optionSelected != 'a'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >A . Asaro Tribe</span
          >
          <span
            @click="chooseOption('b')"
            :class="
              optionSelected != 'b'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >B . Sentinelese Tribe of North Sentinel</span
          >
          <span
            @click="chooseOption('c')"
            :class="
              optionSelected != 'c'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >C . Samburu</span
          >
          <span
            @click="chooseOption('d')"
            :class="
              optionSelected != 'd'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >D . Kazakh Tribe</span
          >
        </div>
      </div>

      <div class="container-fluid text-left" v-if="count === 8">
        <p class="p-4 text-left question">
          <span>Q{{ count }} -</span> What is the name of the oldest tribe in the world that is
          still alive?What is the name of the oldest tribe in the world that is
        </p>
        <div class="d-flex flex-column mt-4">
          <span
            @click="chooseOption('a')"
            :class="
              optionSelected != 'a'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >A . Asaro Tribe</span
          >
          <span
            @click="chooseOption('b')"
            :class="
              optionSelected != 'b'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >B . Sentinelese Tribe of North Sentinel</span
          >
          <span
            @click="chooseOption('c')"
            :class="
              optionSelected != 'c'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >C . Samburu</span
          >
          <span
            @click="chooseOption('d')"
            :class="
              optionSelected != 'd'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >D . Kazakh Tribe</span
          >
        </div>
      </div>

      <div class="container-fluid text-left" v-if="count === 9">
        <p class="p-4 text-left question">
          <span>Q{{ count }} -</span> What is the name of the oldest tribe in the world that is
          still alive?What is the name of the oldest tribe in the world that is
        </p>
        <div class="d-flex flex-column mt-4">
          <span
            @click="chooseOption('a')"
            :class="
              optionSelected != 'a'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >A . Asaro Tribe</span
          >
          <span
            @click="chooseOption('b')"
            :class="
              optionSelected != 'b'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >B . Sentinelese Tribe of North Sentinel</span
          >
          <span
            @click="chooseOption('c')"
            :class="
              optionSelected != 'c'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >C . Samburu</span
          >
          <span
            @click="chooseOption('d')"
            :class="
              optionSelected != 'd'
                ? 'btn option-not-selected text-left mb-4 p-3 option'
                : 'btn-color text-left mb-4 p-3 option'
            "
            >D . Kazakh Tribe</span
          >
        </div>
      </div>

      <div
        class="container-fluid d-flex flex-row mx-6 justify-content-between fixed-bottom bg-white"
        v-if="exit"
      >
        <button class="btn btn-color mb-2" @click="next">Next</button>
        <!-- <button class="btn btn-outline-success mb-2">Submit</button> -->
        <div id="trigger" @click="exitTest">
          <a href="#modal" class="btn btn-outline-success mb-2">Submit</a>
        </div>
      </div>
    </div>
    <div id="modal">
      <div class="containerr">
        <h2 class="text-left">Do you really want to submit?</h2>
        <div>
          <p class="py-3 fw-bolder">you still have some unattempted questions.</p>
          <div class="d-flex justify-content-between">
            <span class="py-3">Questions: 10</span>
            <span class="py-3 fw-bolder text-danger">Attempted: 5</span>
          </div>
        </div>
        <div class="link" @click="exitTest">
          <a href="#trigger" class="btn btnnn w-100 mb-2">cancel</a>
        </div>
        <div>
          <button class="btn btn-color w-100" @click="submitTest">submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'introLayout',
  data() {
    return {
      startTest: true,
      count: 1,
      optionSelected: null,
      play: true,
      exit: true,
    };
  },
  methods: {
    playToggle() {
      this.play = !this.play;
    },
    startTestFunction() {
      this.startTest = !this.startTest;
    },
    goBack() {
      this.$router.push('/category');
    },
    exitTest() {
      this.exit = !this.exit;
    },
    chooseOption(option) {
      this.optionSelected = option;
    },
    next() {
      this.count++;
      this.optionSelected = null;
    },
    previous() {
      if (this.count > 1) {
        this.count--;
      }
    },
    submitTest() {
      this.$router.push('/home');
    },
  },
};
</script>

<style scoped>
.slider {
  overflow-x: scroll;
}
::-webkit-scrollbar {
  display: none;
}
.btn-square-md {
  width: 40px !important;
  max-width: 100% !important;
  max-height: 100% !important;
  height: 40px !important;
  margin-right: 10px;
  text-align: center;
  padding: 0px;
  font-size: 12px;
  color: #11a49b;
  background-color: #fff;
  text-transform: uppercase;
  vertical-align: bottom;
  border: 0;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 20%), 0 2px 10px 0 rgb(0 0 0 / 10%);
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1.5;
  border-radius: 5px;
}
.btn-color {
  color: #fff;
  background-color: #11a49b;
}
.question {
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 5px 2px 15px 0px #e0dddd;
  border-radius: 5px;
}
.option-not-selected {
  background: white;
  border: 1px solid;
  border-color: #11a49b;
  color: #11a49b;
  border-radius: 5px;
}
.option {
  font-weight: 600;
  border-radius: 5px;
  text-align: left !important;
}
.btnnn {
  text-decoration: none;
  color: #ccc;
  background: #333;
  padding: 5px 15px;
  border-radius: 4px;
}

#modal {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(163, 185, 180, 0.73);
  /* background: none; */
  opacity: 0;
  z-index: -1;
  transition: all 300ms ease;
}

.containerr {
  width: 80%;
  margin: auto;
  background: #fff;
  padding: 10px 20px;
  box-sizing: border-box;
  border-radius: 4px;
}

#modal:target {
  opacity: 1;
  z-index: 100;
}
</style>
