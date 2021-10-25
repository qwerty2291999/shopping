<template>
    <div class="admin-login">
        <AdminHome msg="Welcome to Your Vue.js App" />
    </div>
</template>
<script>
// @ is an alias to /src
import AdminHome from "../components/AdminHome.vue";

export default {
    name: "AdminLogin",
    components: {
        AdminHome,
    },
};
</script>
