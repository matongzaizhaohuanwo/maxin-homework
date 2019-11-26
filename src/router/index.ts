import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCookies from 'vue-cookies';
import store from '@/store/index';
import LoginPage from '../views/loginPage/LoginPage.vue';
import TeacherPage from '../views/teacherPage/TeacherPage.vue';
import SubmitListPage from '../views/teacherPage/SubmitListPage.vue';
import StudentPage from '../views/studentPage/StudentPage.vue';
// @ts-ignore
import { UserType } from '@/components/loginPage/LoginDialog.vue';

Vue.use(VueCookies);
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
    meta: {
      requireLogin: false
    }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: {
      requireLogin: false
    }
  },
  {
    path: '/teacher/homework',
    name: 'TeacherPage',
    component: TeacherPage,
    meta: {
      type: UserType.TEACHER,
      requireLogin: true
    }
  },
  {
    path: '/teacher/homework/:id',
    name: 'SubmitListPage',
    component: SubmitListPage,
    meta: {
      type: UserType.TEACHER,
      requireLogin: true
    }
  },
  {
    path: '/student/homework',
    name: 'StudentPage',
    component: StudentPage,
    meta: {
      type: UserType.STUDENT,
      requireLogin: true
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to: any, from: any, next: any) => {
  const isLogin = new Vue().$cookies.get('wm_login');
  store.commit('setIsLogin', isLogin);
  if (to.meta.requireLogin) {
    !isLogin ? next({ path: '/', query: { redirect: to.fullPath } }) : null;
  }
  next();
});

export default router;
