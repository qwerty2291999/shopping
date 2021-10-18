<template>
    <div class="product">
        <Navbar msg="Nav" />
        <Pbody msg="Body" />
        <Footer msg="Footer" />
    </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import Pbody from "../components/ProductBody.vue";

export default {
    name: "Product",
    components: {
        Navbar,
        Footer,
        Pbody,
    },
};
</script>
