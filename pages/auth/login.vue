<template>
  <div>
    <div
      class="vw-100 vh-100 d-flex justify-content-center align-items-center spinner-bg position-absolute opacity-50"
      v-if="isLoading === true"
    >
      <div class="spinner-grow" role="status"></div>
    </div>
    <form class="container text-center background vh-100" @submit.prevent="loginLocal">
      <div class="">
        <img src="~/assets/images/fav.png" height="250" width="250" alt="" class="mx-auto mt-12" />
      </div>
      <!-- Email input -->
      <div class="form-outline mb-4 padding-top">
        <input
          type="email"
          id="form2Example1"
          class="form-control py-2 shadow-sm"
          placeholder="Email"
          required
          v-model="form.email"
        />
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <input
          type="password"
          id="form2Example2"
          class="form-control py-2 shadow-sm"
          required
          v-model="form.password"
          placeholder="Password"
        />
      </div>

      <!-- 2 column grid layout for inline styling -->
      <div class="row mb-4">
        <div class="col">
          <NuxtLink to="/auth/forgotpassword">Forgot password?</NuxtLink>
        </div>
        <div class="col">
          <NuxtLink to="/auth/signup">Register</NuxtLink>
        </div>
      </div>

      <!-- Submit button -->
      <div class="d-flex flex-column">
        <button type="submit" class="btn w-100 btn-color py-2 mb-4 shadow">Sign in</button>
        <span class="fs-5 fw-bolder opacity-75 mb-3">Or</span>
        <div class="d-flex justify-content-center gap-2">
          <button type="button" class="btn bg-white py-2 mb-4 shadow" @click="facebookAuth">
            <img src="@/assets/images/facebook.png" width="30" alt="" />
          </button>
          <button type="button" class="btn bg-white py-2 mb-4 shadow" @click="googleAuth">
            <img src="@/assets/images/google.png" width="30" alt="" />
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { FacebookLogin } from '@capacitor-community/facebook-login';
import { Capacitor } from '@capacitor/core';
// import Plugin from '@capacitor/core';
import { Auth } from 'aws-amplify';
import { Http } from '@capacitor-community/http';
import { mapState, mapActions } from 'vuex';

export default {
  layout: 'introLayout',

  middleware: ['authenticated'],

  data: () => ({
    form: {
      email: '',
      password: '',
    },
    // fbLogin:
  }),

  computed: {
    ...mapState(['isLoading']),
  },

  async mounted() {
    if (Capacitor.getPlatform() === 'web') {
      GoogleAuth.initialize();
      await FacebookLogin.initialize({ appId: '743811610173678' });
    }
  },

  methods: {
    ...mapActions('auth', ['login', 'load']),
    async loginLocal() {
      try {
        await this.login(this.form);
        this.$router.push('/dashboard');
      } catch (err) {
        console.error('err', err);
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

<style scoped>
.btn-color {
  background-color: #11a49b !important;
  color: white;
}
.background {
  background: rgb(226, 226, 226);
}
a {
  text-decoration: none;
  color: #11a49b;
}
.padding-top {
  padding-top: 30%;
}
</style>
