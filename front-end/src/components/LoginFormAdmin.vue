<template>
    <div class="login" v-cloak>
        <div class="container">
            <form>
                <div id="err" v-show="showLog">{{ log }}</div>
                <div class="form-group">
                    <label for="exampleInputUserName">UserName</label>
                    <input
                        v-model="username"
                        class="form-control"
                        id="exampleInputUserName"
                        placeholder="Enter UserName"
                    />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input
                        v-model="password"
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                    />
                </div>
                <button
                    @click.prevent="handleSubmit"
                    type="submit"
                    class="btn btn-primary"
                >
                    Submit
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Home from "../views/Home.vue";
export default {
    name: "LForm",
    props: {
        msg: String,
    },
    data() {
        return { username: "", password: "", showLog: false, log: "" };
    },
    methods: {
        async handleSubmit() {
            try {
                const res = await axios.post(
                    "http://localhost:3000/admin/auth/login",
                    {
                        username: this.username,
                        password: this.password,
                    }
                );
                localStorage.aAccessToken = res.data.accessToken;
                localStorage.aRefreshToken = res.data.refreshToken;
                this.$router.push(Home);
            } catch (e) {
                this.showLog = true;
                this.log = e.response.data.message;
            }
        },
    },
};
</script>

<style scoped>
.login {
    width: 1140px;
    margin: auto;
    margin-top: 200px;
}
.container {
    height: 500px;
    background-color: rgb(170, 170, 170);
    width: 800px;
    position: relative;
    border-radius: 20px;
}
.container:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.container form {
    margin: auto;
    width: 350px;
    position: absolute;
    top: 120px;
    left: 230px;
}
form a {
    display: block;
    margin-top: 20px;
    color: red;
}
#err {
    margin-bottom: 20px;
    color: red;
}
</style>
