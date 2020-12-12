import Vue from "vue";
import VueRouter from "vue-router";

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
  // 书城
  {
    path: "/store",
    component: () => import("../views/store/index.vue"),
    redirect: "/store/home",
    meta: { keepAlive: true },
    children: [
      {
        path: "shelf",
        component: () => import("../components/shelf/shelfHome.vue"),
        meta: { key: 1 },
        // meta: { keepAlive: true },
      },
      {
        path: "home",
        component: () => import("../views/store/StoreHome.vue"),
        meta: { key: 3 },
        // meta: { keepAlive: true },
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
];

const router = new VueRouter({
  routes,
});

export default router;
