<template>
    <div class="home">
        <Navbar msg="Welcome to Your Vue.js App" />
        <ListSales msg="Welcome to Your Vue.js App" />
        <ListItems msg="Welcome to Your Vue.js App" />
        <ListVouchers msg="Welcome to Your Vue.js App" />
        <Footer msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar.vue";
import ListSales from "../components/ListSales.vue";
import ListItems from "../components/ListItems.vue";
import ListVouchers from "../components/ListVouchers.vue";
import Footer from "../components/Footer.vue";

export default {
    name: "Home",
    components: {
        Navbar,
        ListSales,
        ListItems,
        ListVouchers,
        Footer,
    },
};
</script>
