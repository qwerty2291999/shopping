import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Product from "../views/Products.vue";
import Orders from "../views/Orders.vue";
import ListProduct from "../views/ListProduct.vue";
import AdminLogin from "../views/AdminLogin.vue";
import AdminHome from "../views/AdminHome.vue";
import AdminPAdd from "../views/AdminPAdd.vue";
import AdminPAll from "../views/AdminPAll.vue";
import AdminPEdit from "../views/AdminPEdit.vue";
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
    {
        path: "/products",
        name: "ListProducts",
        component: ListProduct,
    },
    {
        path: "/admin/login",
        name: "AdminLogin",
        component: AdminLogin,
    },
    {
        path: "/admin",
        name: "AdminHome",
        component: AdminHome,
    },
    {
        path: "/admin/product/create",
        name: "AdminPAdd",
        component: AdminPAdd,
    },
    {
        path: "/admin/product/all",
        name: "AdminPAll",
        component: AdminPAll,
    },
    {
        path: "/admin/product/editinfo/:id",
        name: "AdminPEdit",
        component: AdminPEdit,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
