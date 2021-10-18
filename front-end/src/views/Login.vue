<template>
    <div class="login">
        <Navbar msg="Welcome to Your Vue.js App" />
        <LoginForm msg="Welcome to Your Vue.js App" />
    </div>
</template>
<script>
// @ is an alias to /src
import Navbar from "../components/Navbar.vue";
import LoginForm from "../components/LoginForm.vue";

export default {
    name: "Login",
    components: {
        Navbar,
        LoginForm,
    },
};
</script>
