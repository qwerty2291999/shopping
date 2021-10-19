import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Product from "../views/Products.vue";
import Orders from "../views/Orders.vue";
const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/auth/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/product/:id",
        name: "Product",
        component: Product,
    },
    {
        path: "/myorders",
        name: "Orders",
        component: Orders,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
