import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importView(path) {
  return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "LayoutTemplate",
      meta: {
        title: "Vuefire 2022",
      },
      component: importView("LayoutTemplate"),
      children: [
        {
          path: "/merchandise",
          name: "Merchandise",
          meta: {
            title: "Vuefire 2022",
          },
          component: importView("MerchandisePage"),
        },

        // {
        //   path: "/temp",
        //   name: "Temp",
        //   meta: {
        //     title: "Vuefire 2022",
        //   },
        //   component: importView("TempPage"),
        // },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
