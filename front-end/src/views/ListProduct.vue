<template>
    <div class="product">
        <Navbar msg="Nav" />
        <ListP msg="Nav" />
        <Footer msg="Footer" />
    </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import ListP from "../components/ListP.vue";

export default {
    name: "ListProduct",
    components: {
        Navbar,
        Footer,
        ListP,
    },
};
</script>
