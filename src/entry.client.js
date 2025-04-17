import { createApp } from './main'

const app = createApp()
const router = app.$router
const store = app.$store

console.log("router:", router)
console.log("store: ", store)


if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  app.$mount('#app')
})
