<template>
    <div v-cloak class="Navbar">
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">Shopping</a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <router-link to="/">
                                <div>
                                    <a class="nav-link text-success" href="#"
                                        >Home
                                        <span class="sr-only"
                                            >(current)</span
                                        ></a
                                    >
                                </div>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-success" href="#"
                                >Products</a
                            >
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-success" href="#">Sales</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-success" href="#"
                                >Your Orders</a
                            >
                        </li>
                    </ul>
                    <router-link to="/auth/login">
                        <button
                            v-show="isLogged == 1"
                            class="btn btn-outline-success my-2 my-sm-0"
                            type="submit"
                        >
                            <a class="nav-link" href="#">Login</a>
                        </button>
                    </router-link>
                    <button
                        @click="logout"
                        v-show="isLogged == 2"
                        class="btn btn-outline-success my-2 my-sm-0"
                        type="submit"
                    >
                        <a class="nav-link" href="#">Logout</a>
                    </button>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
import Home from "../views/Home.vue";
export default {
    name: "Navbar",
    props: {
        msg: String,
    },
    data() {
        return { isLogged: 1 };
    },
    mounted() {
        this.checkLogin();
    },
    methods: {
        checkLogin() {
            if (localStorage.accessToken) {
                this.isLogged = 2;
            } else {
                this.isLogged = 1;
            }
        },
        logout() {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            if (this.$route.name == "Home") {
                window.location.reload();
            }
            this.$route.push(Home);
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
.Navbar {
    background-color: #f8f9fa;
    -moz-box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.5);
    box-shadow: 1px 2px 3px rgba(37, 186, 71, 0.5);
}
.container {
    border-bottom: 4px;
}
.Navbar .container {
    width: 1140px;
}
</style>
