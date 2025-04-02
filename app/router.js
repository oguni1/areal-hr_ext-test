import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/organizations",
      name: "organizations",
      component: () => import("./models/organizationsList")
    },
    {
      path: "/organizations/:id",
      name: "organizations-details",
      component: () => import("./models/organizations")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./models/AddOrganization")
    }
  ]
});
