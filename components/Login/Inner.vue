<template>
  <div>
    <div class="background_color">
      <div class="container px-4">
        <div class="row align-items-center justify-content-between">
          <div class="col-12 text-center">
            <form class="wrapper width_res font-size-16" @submit.prevent="loginLocal">
              <div class="my-3 input-data">
                <p class="fw-bolder font-size-12 text-start mb-2">Email</p>
                <input
                  type="text"
                  class="border border-2 border-grey rounded py-1 px-3 font-size-14"
                  :class="!errors.email.isValid && 'border-danger'"
                  v-model="form.email"
                  required
                  placeholder="name@email.com"
                />
              </div>

              <div class="mb-2 input-data">
                <p class="fw-bolder font-size-12 text-start mb-2">Password</p>

                <input
                  :type="isPasswordVisible ? 'text' : 'password'"
                  class="border border-2 border-grey rounded py-1 px-3 font-size-14"
                  v-model="form.password"
                  required
                  placeholder="Enter Your Password"
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

              <div class="text-start">
                <p
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal_2"
                  class="text-decoration-none text-primary font-size-10 auth_font_size font_family_nunito cursor_pointer"
                >
                  Forgot Password?
                </p>
              </div>

              <div class="text-center mt-3">
                <button
                  type="submit"
                  class="btn text-white fw-bold px-5 w-100 font-size-14"
                  :disabled="!form.email || !form.password || !errors.email.isValid"
                >
                  Login
                </button>
              </div>

              <div>
                <div class="py-2">
                  <p class="font_family_nunito mb-0">or</p>
                </div>
                <div class="social_icons pb-4">
                  <div
                    class="d-flex flex-column align-items-center justify-content-center font-szie-16"
                  >
                    <div
                      class="social_icon_container d-flex align-items-center justify-content-center border border-2 border-grey rounded py-2 px-3 my-2"
                    >
                      <img class="" src="~/assets/images/google_login_icon.png" alt="google" />
                      <p class="text-center font-size-12">Continue with Google</p>
                    </div>
                    <div
                      class="social_icon_container d-flex align-items-center justify-content-center border border-2 border-grey rounded py-2 px-3 my-2"
                    >
                      <img src="~/assets/images/apple_icon.svg" alt="apple" />
                      <p class="font-size-12">Continue with Apple</p>
                    </div>
                    <div
                      class="social_icon_container d-flex align-items-center justify-content-center border border-2 border-grey rounded py-2 px-3 my-2"
                    >
                      <img src="~/assets/images/fb_icon.svg" alt="fb" />
                      <p class="font-size-12">Continue with Facebook</p>
                    </div>
                  </div>
                  <p class="font-size-10 font_weight_300 my-2">
                    New to Mockcertified?
                    <span
                      class="text-primary cursor_pointer"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal_1"
                      >Sign up</span
                    >
                  </p>
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
import { Http } from '@capacitor-community/http';
import { mapState, mapActions } from 'vuex';

export default {
  middleware: ['authenticated'],

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

    async googleAuth() {
      // Auth.federatedSignIn({ provider: 'Google' });
      let googleUser = await GoogleAuth.signIn();
      console.log('googleUser', googleUser);
      const token = googleUser.authentication.idToken;
      let user = {
        email: googleUser.email,
        name: googleUser.name,
      };
      const expiresIn = 3600;
      const providerName = 'google';

      try {
        await Auth.federatedSignIn(
          providerName,
          {
            token,
            expires_at: expiresIn * 1000 + new Date().getTime(), // the expiration timestamp
          },
          user,
        );
      } catch (err) {
        console.log('ERROR', err);
      }
    },

    // async facebookAuth() {
    //   // Auth.federatedSignIn({ provider: 'Facebook' });
    //   const FACEBOOK_PERMISSIONS = ['email', 'user_birthday', 'user_photos', 'user_gender'];
    //   const result = await FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });
    //   console.log('result', result);
    //   const expiresIn = 3600;
    //   const providerName = 'facebook';
    //   if (result.accessToken && result.accessToken.userId) {
    //     const token = result.accessToken.token;
    //     const userId = result.accessToken.userId;

    //     const options = {
    //       url: `https://graph.facebook.com/${userId}?fields=id,name,picture.width(720),birthday,email&access_token=${token}`,
    //       headers: {},
    //       data: {},
    //     };

    //     const response = await Http.post(options);
    //     console.log('response', response);

    //     const prasedData = JSON.parse(response.data);
    //     let user = {
    //       email: prasedData.email,
    //       name: prasedData.name,
    //     };
    //     console.log('useruser', user);
    //     try {
    //       const aa = await Auth.federatedSignIn(
    //         providerName,
    //         {
    //           token,
    //           expires_at: expiresIn * 1000 + new Date().getTime(), // the expiration timestamp
    //         },
    //         user,
    //       );
    //       console.log('AAA', aa);
    //     } catch (err) {
    //       console.log('ERROR2', err);
    //     }
    //   }
    // },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';
.background_color {
  min-height: 75vh;
}

input {
  width: 100%;
}

.eye {
  padding: 7px !important;
}
.social_icons img {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 0;
  margin-left: 2em;
}

.social_icons p {
  margin-bottom: 0;
  font-weight: 600;
}
.btn {
  background: #5271ff;
}
.social_icon_container {
  width: 100%;
  position: relative;
}
.font_weight_300 {
  font-weight: 300 !important;
}
.cursor_pointer {
  cursor: pointer;
}

@include media-breakpoint-up(sm) {
}
@include media-breakpoint-up(md) {
}
@include media-breakpoint-up(lg) {
}
@include media-breakpoint-up(xl) {
}
@include media-breakpoint-up(xxl) {
}
</style>
