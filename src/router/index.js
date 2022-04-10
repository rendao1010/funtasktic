import { createRouter, createWebHistory } from "vue-router";
import ManageTask from "../views/ManageTask.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import Profile from "../views/Profile.vue";
import Meetings from "../views/Meetings.vue";
import Analytics from "../views/Analytics.vue";
import { getUser } from "../utils/user";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/project/:projectId",
    name: "Project overview",
    component: ManageTask,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/meetings",
    name: "Meetings",
    component: Meetings,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/analytics",
    name: "Analytics",
    component: Analytics,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (getUser() == null) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    if (getUser() != null) {
      next({
        path: "/",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  }
});

export default router;