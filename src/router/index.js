import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/store",
    // name: 'Home',
    // component: Home
  },
  //阅读器
  {
    path: "/ebook",
    component: () => import("../views/ebook/index.vue"),
    children: [
      {
        path: ":fileName",
        component: () => import("../components/ebook/EbookReader.vue"),
      },
    ],
  },
  {
    path: "/store",
    component: () => import("../views/store/index.vue"),
    redirect: "/store/home",
    children: [
      {
        path: "home",
        component: () => import("../views/store/StoreHome.vue"),
        meta: { key: 3 },
      },
      {
        path: "list",
        component: () => import("../components/home/bookList.vue"),
        meta: { key: 4 },
      },
      {
        path: "detail",
        component: () => import("../components/home/bookDetail.vue"),
        meta: { key: 5 },
      },
    ],
  },

  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
