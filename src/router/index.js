import VueRouter from 'vue-router'
import { routes } from "./routes.js";
import appConfig from "@/app-config.json";
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, _, next) => {
  document.title = `${(to.meta && to.meta.title) ? to.meta.title : "Weather App"} | ${appConfig.author}`;
  next();
})

export default router
