import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _74b35320 = () => interopDefault(import('..\\pages\\blogpage.vue' /* webpackChunkName: "pages/blogpage" */))
const _c5e7ece0 = () => interopDefault(import('..\\pages\\blogs\\index.vue' /* webpackChunkName: "pages/blogs/index" */))
const _06be5a76 = () => interopDefault(import('..\\pages\\blogsOld.vue' /* webpackChunkName: "pages/blogsOld" */))
const _69916d52 = () => interopDefault(import('..\\pages\\categories\\index.vue' /* webpackChunkName: "pages/categories/index" */))
const _bb1e0116 = () => interopDefault(import('..\\pages\\category\\index.vue' /* webpackChunkName: "pages/category/index" */))
const _4fa8ba9a = () => interopDefault(import('..\\pages\\contact-us.vue' /* webpackChunkName: "pages/contact-us" */))
const _602b7e35 = () => interopDefault(import('..\\pages\\dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _ce256f12 = () => interopDefault(import('..\\pages\\faq.vue' /* webpackChunkName: "pages/faq" */))
const _506f8b5d = () => interopDefault(import('..\\pages\\homepage.vue' /* webpackChunkName: "pages/homepage" */))
const _fdc77d5a = () => interopDefault(import('..\\pages\\homepagenew.vue' /* webpackChunkName: "pages/homepagenew" */))
const _e4f13ca8 = () => interopDefault(import('..\\pages\\mock-test\\index.vue' /* webpackChunkName: "pages/mock-test/index" */))
const _6d1820d0 = () => interopDefault(import('..\\pages\\payment-cancel.vue' /* webpackChunkName: "pages/payment-cancel" */))
const _4aa0c41d = () => interopDefault(import('..\\pages\\payment-success.vue' /* webpackChunkName: "pages/payment-success" */))
const _25c1e4c6 = () => interopDefault(import('..\\pages\\privacy-policy.vue' /* webpackChunkName: "pages/privacy-policy" */))
const _6b8abdd7 = () => interopDefault(import('..\\pages\\search.vue' /* webpackChunkName: "pages/search" */))
const _5cb009a6 = () => interopDefault(import('..\\pages\\terms-conditions.vue' /* webpackChunkName: "pages/terms-conditions" */))
const _532354f5 = () => interopDefault(import('..\\pages\\user-test.vue' /* webpackChunkName: "pages/user-test" */))
const _54d438d5 = () => interopDefault(import('..\\pages\\auth\\forgotpassword.vue' /* webpackChunkName: "pages/auth/forgotpassword" */))
const _14d6e022 = () => interopDefault(import('..\\pages\\auth\\login.vue' /* webpackChunkName: "pages/auth/login" */))
const _22090938 = () => interopDefault(import('..\\pages\\auth\\resend-code.vue' /* webpackChunkName: "pages/auth/resend-code" */))
const _5b41dda2 = () => interopDefault(import('..\\pages\\auth\\signup.vue' /* webpackChunkName: "pages/auth/signup" */))
const _0ff7b0ee = () => interopDefault(import('..\\pages\\protected\\account.vue' /* webpackChunkName: "pages/protected/account" */))
const _a387c99c = () => interopDefault(import('..\\pages\\protected\\admin\\index.vue' /* webpackChunkName: "pages/protected/admin/index" */))
const _3c4dffe2 = () => interopDefault(import('..\\pages\\protected\\attempted-test.vue' /* webpackChunkName: "pages/protected/attempted-test" */))
const _1bdb1bf8 = () => interopDefault(import('..\\pages\\protected\\create-test.vue' /* webpackChunkName: "pages/protected/create-test" */))
const _88644148 = () => interopDefault(import('..\\pages\\protected\\created-test\\index.vue' /* webpackChunkName: "pages/protected/created-test/index" */))
const _2ff5966b = () => interopDefault(import('..\\pages\\protected\\purchased-test.vue' /* webpackChunkName: "pages/protected/purchased-test" */))
const _32199de1 = () => interopDefault(import('..\\pages\\protected\\user-dashboard.vue' /* webpackChunkName: "pages/protected/user-dashboard" */))
const _aecf0418 = () => interopDefault(import('..\\pages\\protected\\admin\\category\\index.vue' /* webpackChunkName: "pages/protected/admin/category/index" */))
const _6cfa45d5 = () => interopDefault(import('..\\pages\\protected\\admin\\feedback.vue' /* webpackChunkName: "pages/protected/admin/feedback" */))
const _48c886d8 = () => interopDefault(import('..\\pages\\protected\\admin\\search-feedback\\index.vue' /* webpackChunkName: "pages/protected/admin/search-feedback/index" */))
const _cbb2a110 = () => interopDefault(import('..\\pages\\protected\\admin\\category\\add-category.vue' /* webpackChunkName: "pages/protected/admin/category/add-category" */))
const _04d52cb4 = () => interopDefault(import('..\\pages\\protected\\admin\\category\\add-subcategory.vue' /* webpackChunkName: "pages/protected/admin/category/add-subcategory" */))
const _48004903 = () => interopDefault(import('..\\pages\\protected\\admin\\category\\edit-category.vue' /* webpackChunkName: "pages/protected/admin/category/edit-category" */))
const _22282349 = () => interopDefault(import('..\\pages\\protected\\admin\\category\\edit-subcategory.vue' /* webpackChunkName: "pages/protected/admin/category/edit-subcategory" */))
const _77c14c1a = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _587cb20c = () => interopDefault(import('..\\pages\\protected\\admin\\category\\_categoryId.vue' /* webpackChunkName: "pages/protected/admin/category/_categoryId" */))
const _03b9b8fa = () => interopDefault(import('..\\pages\\protected\\admin\\test\\_testId.vue' /* webpackChunkName: "pages/protected/admin/test/_testId" */))
const _73d1c1e6 = () => interopDefault(import('..\\pages\\protected\\test\\result\\_attemptedId.vue' /* webpackChunkName: "pages/protected/test/result/_attemptedId" */))
const _d88e0bc4 = () => interopDefault(import('..\\pages\\protected\\test\\start-test\\_testId.vue' /* webpackChunkName: "pages/protected/test/start-test/_testId" */))
const _44b3aa3d = () => interopDefault(import('..\\pages\\category\\test\\_testId.vue' /* webpackChunkName: "pages/category/test/_testId" */))
const _216a2b3c = () => interopDefault(import('..\\pages\\protected\\created-test\\_createdTestId.vue' /* webpackChunkName: "pages/protected/created-test/_createdTestId" */))
const _28a80fca = () => interopDefault(import('..\\pages\\protected\\test\\_testId.vue' /* webpackChunkName: "pages/protected/test/_testId" */))
const _58b90b6a = () => interopDefault(import('..\\pages\\blogs\\_blogslug.vue' /* webpackChunkName: "pages/blogs/_blogslug" */))
const _f049988a = () => interopDefault(import('..\\pages\\categories\\_categoriesId.vue' /* webpackChunkName: "pages/categories/_categoriesId" */))
const _910d788a = () => interopDefault(import('..\\pages\\category\\_categoryId.vue' /* webpackChunkName: "pages/category/_categoryId" */))
const _5e43976e = () => interopDefault(import('..\\pages\\mock-test\\_mockslug.vue' /* webpackChunkName: "pages/mock-test/_mockslug" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/blogpage",
    component: _74b35320,
    name: "blogpage"
  }, {
    path: "/blogs",
    component: _c5e7ece0,
    name: "blogs"
  }, {
    path: "/blogsOld",
    component: _06be5a76,
    name: "blogsOld"
  }, {
    path: "/categories",
    component: _69916d52,
    name: "categories"
  }, {
    path: "/category",
    component: _bb1e0116,
    name: "category"
  }, {
    path: "/contact-us",
    component: _4fa8ba9a,
    name: "contact-us"
  }, {
    path: "/dashboard",
    component: _602b7e35,
    name: "dashboard"
  }, {
    path: "/faq",
    component: _ce256f12,
    name: "faq"
  }, {
    path: "/homepage",
    component: _506f8b5d,
    name: "homepage"
  }, {
    path: "/homepagenew",
    component: _fdc77d5a,
    name: "homepagenew"
  }, {
    path: "/mock-test",
    component: _e4f13ca8,
    name: "mock-test"
  }, {
    path: "/payment-cancel",
    component: _6d1820d0,
    name: "payment-cancel"
  }, {
    path: "/payment-success",
    component: _4aa0c41d,
    name: "payment-success"
  }, {
    path: "/privacy-policy",
    component: _25c1e4c6,
    name: "privacy-policy"
  }, {
    path: "/search",
    component: _6b8abdd7,
    name: "search"
  }, {
    path: "/terms-conditions",
    component: _5cb009a6,
    name: "terms-conditions"
  }, {
    path: "/user-test",
    component: _532354f5,
    name: "user-test"
  }, {
    path: "/auth/forgotpassword",
    component: _54d438d5,
    name: "auth-forgotpassword"
  }, {
    path: "/auth/login",
    component: _14d6e022,
    name: "auth-login"
  }, {
    path: "/auth/resend-code",
    component: _22090938,
    name: "auth-resend-code"
  }, {
    path: "/auth/signup",
    component: _5b41dda2,
    name: "auth-signup"
  }, {
    path: "/protected/account",
    component: _0ff7b0ee,
    name: "protected-account"
  }, {
    path: "/protected/admin",
    component: _a387c99c,
    name: "protected-admin"
  }, {
    path: "/protected/attempted-test",
    component: _3c4dffe2,
    name: "protected-attempted-test"
  }, {
    path: "/protected/create-test",
    component: _1bdb1bf8,
    name: "protected-create-test"
  }, {
    path: "/protected/created-test",
    component: _88644148,
    name: "protected-created-test"
  }, {
    path: "/protected/purchased-test",
    component: _2ff5966b,
    name: "protected-purchased-test"
  }, {
    path: "/protected/user-dashboard",
    component: _32199de1,
    name: "protected-user-dashboard"
  }, {
    path: "/protected/admin/category",
    component: _aecf0418,
    name: "protected-admin-category"
  }, {
    path: "/protected/admin/feedback",
    component: _6cfa45d5,
    name: "protected-admin-feedback"
  }, {
    path: "/protected/admin/search-feedback",
    component: _48c886d8,
    name: "protected-admin-search-feedback"
  }, {
    path: "/protected/admin/category/add-category",
    component: _cbb2a110,
    name: "protected-admin-category-add-category"
  }, {
    path: "/protected/admin/category/add-subcategory",
    component: _04d52cb4,
    name: "protected-admin-category-add-subcategory"
  }, {
    path: "/protected/admin/category/edit-category",
    component: _48004903,
    name: "protected-admin-category-edit-category"
  }, {
    path: "/protected/admin/category/edit-subcategory",
    component: _22282349,
    name: "protected-admin-category-edit-subcategory"
  }, {
    path: "/",
    component: _77c14c1a,
    name: "index"
  }, {
    path: "/protected/admin/category/:categoryId",
    component: _587cb20c,
    name: "protected-admin-category-categoryId"
  }, {
    path: "/protected/admin/test/:testId?",
    component: _03b9b8fa,
    name: "protected-admin-test-testId"
  }, {
    path: "/protected/test/result/:attemptedId?",
    component: _73d1c1e6,
    name: "protected-test-result-attemptedId"
  }, {
    path: "/protected/test/start-test/:testId?",
    component: _d88e0bc4,
    name: "protected-test-start-test-testId"
  }, {
    path: "/category/test/:testId?",
    component: _44b3aa3d,
    name: "category-test-testId"
  }, {
    path: "/protected/created-test/:createdTestId?",
    component: _216a2b3c,
    name: "protected-created-test-createdTestId"
  }, {
    path: "/protected/test/:testId?",
    component: _28a80fca,
    name: "protected-test-testId"
  }, {
    path: "/blogs/:blogslug",
    component: _58b90b6a,
    name: "blogs-blogslug"
  }, {
    path: "/categories/:categoriesId",
    component: _f049988a,
    name: "categories-categoriesId"
  }, {
    path: "/category/:categoryId",
    component: _910d788a,
    name: "category-categoryId"
  }, {
    path: "/mock-test/:mockslug?",
    component: _5e43976e,
    name: "mock-test-mockslug"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
