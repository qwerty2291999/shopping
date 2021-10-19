<template>
    <div class="orders">
        <Navbar msg="Nav" />
        <OrdersBody msg="Body" />
    </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar.vue";
import OrdersBody from "../components/OrdersBody.vue";

export default {
    name: "Orders",
    components: {
        Navbar,
        OrdersBody,
    },
};
</script>
