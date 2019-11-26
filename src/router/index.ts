import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginPage from '../views/loginPage/LoginPage.vue';
import TeacherPage from '../views/teacherPage/TeacherPage.vue';
import SubmitListPage from '../views/teacherPage/SubmitListPage.vue';
import StudentPage from '../views/studentPage/StudentPage.vue';
// @ts-ignore
import { UserType } from '@/components/loginPage/LoginDialog.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/teacher/homework',
    name: 'TeacherPage',
    component: TeacherPage,
    mate: {
      type: UserType.TEACHER
    }
  },
  {
    path: '/teacher/homework/:id',
    name: 'SubmitListPage',
    component: SubmitListPage
  },
  {
    path: '/student/homework',
    name: 'StudentPage',
    component: StudentPage,
    mate: {
      type: UserType.STUDENT
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
