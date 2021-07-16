import Home from '../views/Home.vue';
export const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: "Cities",
        requiresAuth: false
      }
    },
    {
      path: '/weather/:city',
      name: 'Weather',
      meta: {
        title: "Weather",
        requiresAuth: false
      },
      // route level code-splitting
      // this generates a separate chunk (weather.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Weather.vue')
    }
  ]

  