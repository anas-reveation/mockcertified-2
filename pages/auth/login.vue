<template>
  <div class="container px-4">
    <NavbarLogo />

    <div class="row">
      <div class="col-sm-6 d-none d-sm-flex flex-column align-items-center justify-content-center">
        <div>
          <img src="~/assets/images/Illustration.svg" class="me-4" alt="Illustration" />
        </div>
      </div>
      <div class="col-sm-6">
        <img
          class="position-absolute top-0 end-0 d-sm-none oval_img"
          src="@/assets/images/oval.jpg"
          alt="oval"
        />

        <form class="wrapper width_res" @submit.prevent="loginLocal">
          <h1 class="my-5 text-sm-center font_size_36">Login</h1>

          <div class="mb-4 input-data">
            <input
              type="text"
              class="border border-2 border-primary rounded py-3"
              :class="!errors.email.isValid && 'border-danger'"
              v-model="form.email"
              required
            />
            <label>Email</label>
          </div>

          <div class="mb-2 input-data">
            <input
              :type="isPasswordVisible ? 'text' : 'password'"
              class="border border-2 border-primary rounded py-3"
              v-model="form.password"
              required
            />
            <label>Password</label>
            <div class="position-relative" @click="isPasswordVisible = !isPasswordVisible">
              <img
                v-if="isPasswordVisible"
                class="position-absolute bottom-50 end-0 p-2"
                src="@/assets/images/password_visible.svg"
                alt="eye"
              />
              <img
                v-else
                class="position-absolute bottom-50 end-0 p-2"
                src="@/assets/images/password_not_visible.svg"
                alt="eye"
              />
            </div>
          </div>

          <div class="text-end">
            <NuxtLink to="/auth/forgotpassword"> Forgot Password? </NuxtLink>
          </div>

          <div class="text-center mt-2">
            <button
              type="submit"
              class="btn border border-2 border-primary fw-bold px-3 login_btn_width"
              :class="!form.email || !form.password ? 'btn-gray' : 'btn-secondary'"
              :disabled="!form.email || !form.password || !errors.email.isValid"
            >
              Login
            </button>
          </div>

          <!-- <div class="mt-4 underline_hr"><span>or continue with</span></div> -->

          <div class="mt-2">
            <!-- <button
          type="button"
          class="btn btn-secondary fw-bold border border-2 border-primary p-3 mt-2 w-100 text-start"
        >
          <span class="p-1 bg-white border border-2 rounded">
            <img src="@/assets/images/google.png" alt="google" width="20" />
          </span>
          Continue with Google
        </button>
        <br />
        <button
          type="button"
          class="btn btn-secondary fw-bold border border-2 border-primary p-3 mt-2 w-100 text-start"
        >
          <span class="p-1 bg-white border border-2 rounded">
            <img src="@/assets/images/facebook.png" alt="facebook" width="20" />
          </span>
          Continue with Facebook
        </button> -->

            <p v-if="platform === 'web'" class="mt-4 text-center">
              New to Mockcertified ?
              <NuxtLink to="/auth/signup" class="fw-bolder">Register</NuxtLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { FacebookLogin } from '@capacitor-community/facebook-login';
import { Capacitor } from '@capacitor/core';
import { Auth } from 'aws-amplify';
import { Http } from '@capacitor-community/http';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  layout: 'introLayout',

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
      await FacebookLogin.initialize({ appId: '743811610173678' });
    }
  },

  methods: {
    ...mapActions('auth', ['login', 'load']),

    async loginLocal() {
      const res = await this.login(this.form);
      if (res && this.redirectUrl) {
        this.$router.push(this.redirectUrl);
      } else if (res) {
        this.$router.push('/dashboard');
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

    async facebookAuth() {
      // Auth.federatedSignIn({ provider: 'Facebook' });
      const FACEBOOK_PERMISSIONS = ['email', 'user_birthday', 'user_photos', 'user_gender'];
      const result = await FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });
      console.log('result', result);
      const expiresIn = 3600;
      const providerName = 'facebook';
      if (result.accessToken && result.accessToken.userId) {
        const token = result.accessToken.token;
        const userId = result.accessToken.userId;

        const options = {
          url: `https://graph.facebook.com/${userId}?fields=id,name,picture.width(720),birthday,email&access_token=${token}`,
          headers: {},
          data: {},
        };

        const response = await Http.post(options);
        console.log('response', response);

        const prasedData = JSON.parse(response.data);
        let user = {
          email: prasedData.email,
          name: prasedData.name,
        };
        console.log('useruser', user);
        try {
          const aa = await Auth.federatedSignIn(
            providerName,
            {
              token,
              expires_at: expiresIn * 1000 + new Date().getTime(), // the expiration timestamp
            },
            user,
          );
          console.log('AAA', aa);
        } catch (err) {
          console.log('ERROR2', err);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/auth.scss';
@import '~/assets/css/bootstrapBreakpoint';

@include media-breakpoint-up(sm) {
  .width_res {
    width: 75%;
  }

  .login_btn_width {
    width: 100%;
  }
}
</style>
