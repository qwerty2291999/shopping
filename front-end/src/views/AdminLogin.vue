<template>
    <div class="admin-login">
        <LoginFormAdmin msg="Welcome to Your Vue.js App" />
    </div>
</template>
<script>
// @ is an alias to /src
import LoginFormAdmin from "../components/LoginFormAdmin.vue";

export default {
    name: "AdminLogin",
    components: {
        LoginFormAdmin,
    },
};
</script>
