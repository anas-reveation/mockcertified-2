import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const VUEX_PROPERTIES = ['state', 'getters', 'actions', 'mutations']

let store = {};

(function updateModules () {
  store = normalizeRoot(require('..\\store\\index.js'), 'store/index.js')

  // If store is an exported method = classic mode (deprecated)

  // Enforce store modules
  store.modules = store.modules || {}

  resolveStoreModules(require('..\\store\\modules\\userTest\\index.js'), 'modules/userTest/index.js')
  resolveStoreModules(require('..\\store\\modules\\testManagement\\index.js'), 'modules/testManagement/index.js')
  resolveStoreModules(require('..\\store\\modules\\seller\\index.js'), 'modules/seller/index.js')
  resolveStoreModules(require('..\\store\\modules\\dashboard\\index.js'), 'modules/dashboard/index.js')
  resolveStoreModules(require('..\\store\\modules\\buyer\\index.js'), 'modules/buyer/index.js')
  resolveStoreModules(require('..\\store\\modules\\auth\\index.js'), 'modules/auth/index.js')
  resolveStoreModules(require('..\\store\\modules\\admin\\index.js'), 'modules/admin/index.js')
  resolveStoreModules(require('..\\store\\modules\\admin\\actions.js'), 'modules/admin/actions.js')
  resolveStoreModules(require('..\\store\\modules\\admin\\mutations.js'), 'modules/admin/mutations.js')
  resolveStoreModules(require('..\\store\\modules\\auth\\actions.js'), 'modules/auth/actions.js')
  resolveStoreModules(require('..\\store\\modules\\auth\\mutations.js'), 'modules/auth/mutations.js')
  resolveStoreModules(require('..\\store\\modules\\buyer\\actions.js'), 'modules/buyer/actions.js')
  resolveStoreModules(require('..\\store\\modules\\buyer\\mutations.js'), 'modules/buyer/mutations.js')
  resolveStoreModules(require('..\\store\\modules\\dashboard\\actions.js'), 'modules/dashboard/actions.js')
  resolveStoreModules(require('..\\store\\modules\\dashboard\\mutations.js'), 'modules/dashboard/mutations.js')
  resolveStoreModules(require('..\\store\\modules\\seller\\actions.js'), 'modules/seller/actions.js')
  resolveStoreModules(require('..\\store\\modules\\seller\\mutations.js'), 'modules/seller/mutations.js')
  resolveStoreModules(require('..\\store\\modules\\testManagement\\actions.js'), 'modules/testManagement/actions.js')
  resolveStoreModules(require('..\\store\\modules\\testManagement\\mutations.js'), 'modules/testManagement/mutations.js')
  resolveStoreModules(require('..\\store\\modules\\userTest\\actions.js'), 'modules/userTest/actions.js')
  resolveStoreModules(require('..\\store\\modules\\userTest\\mutations.js'), 'modules/userTest/mutations.js')

  // If the environment supports hot reloading...
})()

// createStore
export const createStore = store instanceof Function ? store : () => {
  return new Vuex.Store(Object.assign({
    strict: (process.env.NODE_ENV !== 'production')
  }, store))
}

function normalizeRoot (moduleData, filePath) {
  moduleData = moduleData.default || moduleData

  if (moduleData.commit) {
    throw new Error(`[nuxt] ${filePath} should export a method that returns a Vuex instance.`)
  }

  if (typeof moduleData !== 'function') {
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData)
  }
  return normalizeModule(moduleData, filePath)
}

function normalizeModule (moduleData, filePath) {
  if (moduleData.state && typeof moduleData.state !== 'function') {
    console.warn(`'state' should be a method that returns an object in ${filePath}`)

    const state = Object.assign({}, moduleData.state)
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData, { state: () => state })
  }
  return moduleData
}

function resolveStoreModules (moduleData, filename) {
  moduleData = moduleData.default || moduleData
  // Remove store src + extension (./foo/index.js -> foo/index)
  const namespace = filename.replace(/\.(js|mjs)$/, '')
  const namespaces = namespace.split('/')
  let moduleName = namespaces[namespaces.length - 1]
  const filePath = `store/${filename}`

  moduleData = moduleName === 'state'
    ? normalizeState(moduleData, filePath)
    : normalizeModule(moduleData, filePath)

  // If src is a known Vuex property
  if (VUEX_PROPERTIES.includes(moduleName)) {
    const property = moduleName
    const propertyStoreModule = getStoreModule(store, namespaces, { isProperty: true })

    // Replace state since it's a function
    mergeProperty(propertyStoreModule, moduleData, property)
    return
  }

  // If file is foo/index.js, it should be saved as foo
  const isIndexModule = (moduleName === 'index')
  if (isIndexModule) {
    namespaces.pop()
    moduleName = namespaces[namespaces.length - 1]
  }

  const storeModule = getStoreModule(store, namespaces)

  for (const property of VUEX_PROPERTIES) {
    mergeProperty(storeModule, moduleData[property], property)
  }

  if (moduleData.namespaced === false) {
    delete storeModule.namespaced
  }
}

function normalizeState (moduleData, filePath) {
  if (typeof moduleData !== 'function') {
    console.warn(`${filePath} should export a method that returns an object`)
    const state = Object.assign({}, moduleData)
    return () => state
  }
  return normalizeModule(moduleData, filePath)
}

function getStoreModule (storeModule, namespaces, { isProperty = false } = {}) {
  // If ./mutations.js
  if (!namespaces.length || (isProperty && namespaces.length === 1)) {
    return storeModule
  }

  const namespace = namespaces.shift()

  storeModule.modules[namespace] = storeModule.modules[namespace] || {}
  storeModule.modules[namespace].namespaced = true
  storeModule.modules[namespace].modules = storeModule.modules[namespace].modules || {}

  return getStoreModule(storeModule.modules[namespace], namespaces, { isProperty })
}

function mergeProperty (storeModule, moduleData, property) {
  if (!moduleData) {
    return
  }

  if (property === 'state') {
    storeModule.state = moduleData || storeModule.state
  } else {
    storeModule[property] = Object.assign({}, storeModule[property], moduleData)
  }
}
