import VueRouter from 'vue-router'
import { routes } from "./routes.js";

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
