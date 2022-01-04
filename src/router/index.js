import VueRouter from 'vue-router'
import { routes } from "./routes.js";
import appConfig from "@/app-config.json";
const router = new VueRouter({
  mode: 'history',
  scrollBehavior: function(to, _, savedPosition){
    if(to.hash){
      setTimeout(() => {
        const element = document.getElementById(to.hash.replace(/#/, ''))
        if (element && element.scrollIntoView) {
          element.scrollIntoView({block: 'center', behavior: 'smooth'})
          element.classList.add("blink--element");
          setTimeout(() => {
            element.classList.remove("blink--element");
            window.history.pushState("", document.title, window.location.pathname);
          }, 3000);
        }
      }, 500);
        return {
          el: to.hash
        }
    }else{
      return savedPosition;
    }
  },
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, _, next) => {
  document.title = `${(to.meta && to.meta.title) ? to.meta.title : "Weather App"} | ${appConfig.author}`;
  next();
})

export default router
