# Mockcertified

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate

# To generate splash screen and icon
$ npm install -g cordova-res
cordova-res expects a Cordova-like structure: place one icon and one splash screen file in a top-level resources folder within your project, like so:

resources/
├──android
├   ├──icon-foreground.png - 432x432
├   └──icon-background.png - 432x432
├── icon.png - 1024x1024
└── splash.png - 2732x2732
Next, run the following to generate all images then copy them into the native projects:

cordova-res ios --skip-config --copy
cordova-res android --skip-config --copy

```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).

---

## 'NOTE: npx cap sync'

While npx cap sync for IOS it would remove "pod 'Instabug'" from Podfile. If by mistake you have done that please refer code below:

```
pod 'Instabug'
pod install

Since CocoaPods might not always download the latest version of the SDK when using pod install, we recommend that you also run pod update Instabug after the installation has completed or whenever you would like to update Instabug.
```

## 'For Deep Link'

To setup deep links [the documentation](https://devdactic.com/setup-deep-links-capacitor/).

## '@capacitor/app configuration'

To setup @capacitor/app (ex: to detect back-button, deeplink, etc... ) [the documentation](https://capacitorjs.com/docs/apis/app).

## 'Socail Auth'

Set Environment variables in amplify

AMPLIFY_FACEBOOK_CLIENT_ID
AMPLIFY_FACEBOOK_CLIENT_SECRET
AMPLIFY_GOOGLE_CLIENT_ID
AMPLIFY_GOOGLE_CLIENT_SECRET

### Android google developer account (OAuth 2.0 Client IDs)

Create OAuth client ID "Web Application" & "Andorid". Use "Web Application" ID in android code (android\app\src\main\res\values\strings.xml - <string name="server_client_id">{Web Application}</string>)

### To Edit Static content eg: privacy policy, etc..

If you want to fetch data from app sync then try this to remove "/" [website](https://www.browserling.com/tools/strip-slashes).

## AppSync API Key Renewal - 16/01/2022 Last Renewed

Regarding Appsync API key , Appsync API key is to be renewed every year from the AWS console(last updated : 16/01/2022)
Possible error if the API key is expired are 401 or 400.

## Project Architecture flow chart

![Project_Architecture](https://amplify-mobileappmarketplace-dev-123858-deployment.s3.amazonaws.com/public+image/MockCertified-Architecture.jpg)