import { createRouter, createWebHistory } from "vue-router";

import store from "../store";
import { setUser } from "../store/dispatchTypes";

import { users } from "../assets/users";

import Home from "../views/Home";
import UserProfile from "../views/UserProfile";
import Admin from "../views/Admin";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/user/:userId",
    name: "UserProfile",
    component: UserProfile,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      requiresAdmin: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ROUTER GUARDS
router.beforeEach(async (to, from, next) => {
  const user = store.state.User.user;

  if (!user) {
    await store.dispatch(setUser, users[1]);
  }

  const isAdmin = false;
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);

  if (requiresAdmin && !isAdmin) {
    next({
      name: "Home",
    });
  } else {
    next();
  }
});

export default router;
