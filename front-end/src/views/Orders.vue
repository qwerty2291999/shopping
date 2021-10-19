<template>
    <div class="product">
        <Navbar msg="Nav" />
        <OrdersBody msg="Body" />
    </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar.vue";
import OrdersBody from "../components/OrdersBody.vue";

export default {
    name: "Product",
    components: {
        Navbar,
        OrdersBody,
    },
};
</script>
