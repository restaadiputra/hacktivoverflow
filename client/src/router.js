import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import(/* webpackChunkName: "signin" */ './views/Signin.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "signup" */ './views/Signup.vue'),
    },
    {
      path: '/users/dashboard',
      name: 'user-dashboard',
      component: () => import(/* webpackChunkName: "signup" */ './views/Dashboard.vue'),
      meta: {
        authRequired: true
      }
    },
    {
      path: '/users/questions',
      name: 'user-question',
      component: () => import(/* webpackChunkName: "user-question" */ './views/MyQuestion.vue'),
      meta: {
        authRequired: true
      }
    },
    {
      path: '/questions/ask',
      name: 'ask-question',
      component: () => import(/* webpackChunkName: "ask-question" */ './views/AskQuestion.vue'),
      meta: {
        authRequired: true
      }
    },
    {
      path: '/questions/:id',
      name: 'detail-question',
      component: () => import(/* webpackChunkName: "detail-question" */ './views/QuestionDetail.vue'),
    },
    {
      path: '/questions/:id/edit',
      name: 'edit-question',
      component: () => import(/* webpackChunkName: "edit-question" */ './views/EditQuestion.vue'),
      meta: {
        authRequired: true
      }
    },
    {
      path: '/users/answers',
      name: 'user-answer',
      component: () => import(/* webpackChunkName: "user-answer" */ './views/MyAnswer.vue'),
      meta: {
        authRequired: true
      }
    },
    {
      path: '/answers/:id/edit',
      name: 'edit-answer',
      component: () => import(/* webpackChunkName: "user-answer" */ './views/EditAnswer.vue'),
      meta: {
        authRequired: true
      }
    },
    

  ],
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record =>  record.meta.authRequired )) {
    if (!store.state.signin) {
      next({
        path:'/signin?needed=true',
        props: { 
          needRegister: true 
        }
      });
    } else {
      next();
    }
  }
  if(to.fullPath === '/answer/:id') {
    next('/questions')
  }
  next();
});

export default router;
