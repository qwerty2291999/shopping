<template>
    <div class="admin-product-add">
        <AdminProductEdit msg="Welcome to Your Vue.js App" />
    </div>
</template>
<script>
// @ is an alias to /src
import AdminProductEdit from "../components/AdminPEdit.vue";

export default {
    name: "AdminPEdit",
    components: {
        AdminProductEdit,
    },
};
</script>
