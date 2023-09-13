<template>
  <div>
    <NavbarAuth />
    <div class="background_color">
      <div class="container">
        <div class="row align-items-center justify-content-between position-relative min_height">
          <div class="col-md-7 mt-5 mt-md-0">
            <div class="row align-items-center position-relative">
              <div class="col-8">
                <p class="span_blue_color text-center fw-bold font_family_aileron long_text">
                  Log in, <br />
                  because <span class="text-dark">growth</span> <br />
                  starts here.
                </p>
              </div>
              <div class="col-4 img_container">
                <img class="w-100 h-100" src="~/assets/images/rocket.webp" alt="rocket" />
              </div>
            </div>

            <div class="d-md-none mt-5">
              <p class="mockcertified_text font_family_aileron span_blue_color">Mockcertifed</p>
            </div>
            <div class="d-none d-md-block position-absolute bottom-0">
              <p class="mockcertified_text font_family_aileron span_blue_color">Mockcertifed</p>
            </div>
          </div>
          <div class="col-12 col-md-5 col-lg-4 text-center min-vh-100">
            <h1 class="text-center span_blue_color py-3 fw-bold font_family_aileron">Login</h1>
            <form class="wrapper width_res" @submit.prevent="loginLocal">
              <div class="my-3 input-data">
                <input
                  type="text"
                  class="border border-2 border-grey rounded py-2 px-3"
                  :class="!errors.email.isValid && 'border-danger'"
                  v-model="form.email"
                  required
                  placeholder="Email"
                />
              </div>

              <div class="mb-2 input-data">
                <input
                  :type="isPasswordVisible ? 'text' : 'password'"
                  class="border border-2 border-grey rounded py-2 px-3"
                  v-model="form.password"
                  required
                  placeholder="Password"
                />
                <div class="position-relative" @click="isPasswordVisible = !isPasswordVisible">
                  <img
                    v-if="isPasswordVisible"
                    class="position-absolute bottom-50 end-0 eye"
                    src="@/assets/images/password_visible.svg"
                    alt="eye"
                  />
                  <img
                    v-else
                    class="position-absolute bottom-50 end-0 eye"
                    src="@/assets/images/password_not_visible.svg"
                    alt="eye"
                  />
                </div>
              </div>

              <div class="text-end">
                <NuxtLink
                  to="/auth/forgotpassword"
                  class="text-decoration-none font_size_14 auth_font_size font_family_nunito"
                >
                  Forgot Password?
                </NuxtLink>
              </div>

              <div class="text-center mt-2">
                <button
                  type="submit"
                  class="btn text-white rounded-pill fw-bold px-5"
                  :disabled="!form.email || !form.password || !errors.email.isValid"
                >
                  Login
                </button>
              </div>

              <div>
                <div class="py-3">
                  <p class="font_family_nunito">OR</p>
                  <p class="font_family_nunito">continue with</p>
                </div>
                <div class="social_icons">
                  <div class="d-flex align-items-center justify-content-around">
                    <div class="social_icon_container">
                      <img class="w-100 h-100" src="~/assets/images/google_icon.svg" alt="google" />
                    </div>
                    <div class="social_icon_container">
                      <img class="w-100 h-100" src="~/assets/images/apple_icon.svg" alt="apple" />
                    </div>
                    <div class="social_icon_container">
                      <img class="w-100 h-100" src="~/assets/images/fb_icon.svg" alt="fb" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
// import { FacebookLogin } from '@capacitor-community/facebook-login';
import { Capacitor } from '@capacitor/core';
import { Auth } from 'aws-amplify';
// import { Http } from '@capacitor-community/http';
import { mapState, mapActions } from 'vuex';

export default {
  layout: 'authLayout',
  middleware: ['authenticated'],

  head() {
    return {
      title: 'Login',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Sign in to your Mockcertified account to use a wide categories of mock test.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Login - Mockcertified App',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Sign in to your Mockcertified account to use a wide categories of mock test.',
        },
        {
          name: 'keywords',
          content: 'Login, Mockcertified App',
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
      ],
    };
  },

  data: () => ({
    form: {
      email: '',
      password: '',
    },
    isPasswordVisible: false,

    errors: {
      email: {
        isValid: true,
        isVisiable: false,
        msg: 'Invalid email address',
      },
    },
  }),

  computed: {
    ...mapState(['isLoading', 'redirectUrl', 'platform']),
  },

  watch: {
    'form.email'(newValue, _oldValue) {
      // trimmed whitespace
      this.form.email = newValue.trim();

      this.errors.email.isValid =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
          newValue,
        );

      if (this.errors.email.isValid) {
        this.errors.email.isVisiable = false;
      }
    },
  },

  async mounted() {
    if (Capacitor.getPlatform() === 'web') {
      //   GoogleAuth.initialize();
      // await FacebookLogin.initialize({ appId: '743811610173678' });
    }
  },

  methods: {
    ...mapActions('auth', ['login', 'load']),

    async loginLocal() {
      const res = await this.login(this.form);
      if (res && this.redirectUrl) {
        this.$router.push(this.redirectUrl);
      } else if (res) {
        this.$router.push('/homepage');
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';
.background_color {
  background: linear-gradient(to right, #dee2fb, #fafafa);
}
.long_text {
  font-size: 25px;
}

input {
  background: #e2e3e8;
  width: 100%;
  color: #7b7777;
}

.eye {
  padding: 15px !important;
}
.social_icon_container {
  width: 35px;
  height: 35px;
  cursor: pointer;
}

.min_height {
  min-height: 90vh;
}

.mockcertified_text {
  font-size: 30px;
  // background-color: linear-gradient(to right, #1abe36, #fafafa);
  // background: radial-gradient(circle at center, rgb(223 252 252), transparent);
  // padding: 3rem 3rem 3rem 0;
}

.btn {
  background: #5271ff;
}

.img_container {
  transform: scale(2.5);
}
@include media-breakpoint-up(sm) {
  .social_icon_container {
    width: 45px;
    height: 45px;
  }
}
@include media-breakpoint-up(md) {
  .social_icon_container {
    width: 55px;
    height: 55px;
  }
  .long_text {
    font-size: 26px;
  }
  .mockcertified_text {
    font-size: 40px;
  }
}
@include media-breakpoint-up(lg) {
  .social_icon_container {
    width: 65px;
    height: 65px;
  }
  .long_text {
    font-size: 36px;
  }
  .mockcertified_text {
    font-size: 40px;
  }
}
@include media-breakpoint-up(xl) {
  .long_text {
    font-size: 43px;
  }
}
@include media-breakpoint-up(xxl) {
  .long_text {
    font-size: 50px;
  }
}
</style>
