import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginPage from '../views/loginPage/LoginPage.vue';
import TeacherPage from '../views/teacherPage/TeacherPage.vue';
import SubmitListPage from '../views/teacherPage/SubmitListPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/teacher',
    name: 'TeacherPage',
    component: TeacherPage,
  },
  {
        path: '/homework/:id',
        name: 'SubmitListPage',
        component: SubmitListPage
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
