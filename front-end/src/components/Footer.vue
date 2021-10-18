<template>
    <div class="footer">
        <div class="container"><div>Footer</div></div>
    </div>
</template>

<script>
export default {
    name: "Footer",
    props: {
        msg: String,
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
.footer {
    margin-top: 60px;
    height: 350px;
    background-color: rgb(19, 34, 89);
    -moz-box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.5);
    box-shadow: 1px 2px 3px rgba(37, 186, 71, 0.5);
}
.container {
    border-bottom: 4px;
}
.footer .container {
    width: 1140px;
}
.container div {
    line-height: 350px;
    font-size: 50px;
    color: white;
}
</style>
