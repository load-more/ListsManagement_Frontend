import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('views/Register.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('views/Home.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const needLogin = ['/home']
  const userid = sessionStorage.getItem('userid')
  if (needLogin.indexOf(to.path) === -1) {
    next()
  } else if (userid) {
    next()
  } else if (to.path === '/login') {
    next()
  } else {
    next('/login')
  }
})

export default router;
