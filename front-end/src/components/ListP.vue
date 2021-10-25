<template>
    <div class="list-products" v-cloak>
        <div class="top">
            <div class="box">
                <div class="input-group mb-3 input">
                    <span
                        class="input-group-text"
                        id="inputGroup-sizing-default"
                        >Search</span
                    >
                    <input
                        v-model="key"
                        type="text"
                        class="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                    />
                </div>
            </div>
        </div>
        <div class="bot">
            <div class="list-items">
                <ul :key="rf">
                    <li v-for="item in pageFilter" :key="item.id" class="li">
                        <div class="item" @click="move(item.id)">
                            <img
                                :src="baseImgUrl + item.mainimg.filename"
                                alt="product"
                                style="width:100%"
                            />
                            <div class="container">
                                <p>
                                    <b>Name : {{ item.name }}</b>
                                </p>
                                <p></p>
                                <p>Price : {{ item.sellingPrice }}</p>
                            </div>
                            <button
                                style="font-size:14px;
                                margin-bottom: 12px"
                                type="button"
                                class="btn btn-primary"
                            >
                                Details
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="page">
            <ul>
                <li
                    v-for="index in pageCount"
                    v-bind:key="index"
                    @click="nextPage(index)"
                >
                    <p>{{ index }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "ListP",
    props: {
        msg: String,
    },
    async mounted() {
        await this.getData();
        this.sort();
    },
    data() {
        return {
            listItem: [],
            cutPage: [],
            baseImgUrl: "http://127.0.0.1:8089/",
            pageCount: "",
            currentPage: 1,
            itemPerPage: 4,
            rf: 0,
            key: "",
        };
    },
    methods: {
        async sort() {
            console.log(this.filter.length);
        },
        async getData() {
            try {
                const res = await axios.get(`http://localhost:3000/item`);
                this.listItem = res.data;
            } catch (e) {
                console.log(e);
            }
        },
        nextPage(index) {
            this.currentPage = index;
            this.cutPage = this.filter.slice(
                this.itemPerPage * this.currentPage - this.itemPerPage,
                this.itemPerPage * this.currentPage
            );
            this.rf++;
        },
        move(id) {
            this.$router.push(`/product/${id}`);
        },
    },
    computed: {
        filter: function() {
            return this.listItem.filter((item) => {
                return item.name.toLowerCase().match(this.key.toLowerCase());
            });
        },
        pageFilter: function() {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.pageCount = Math.ceil(this.filter.length / this.itemPerPage);
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            return (this.cutPage = this.filter.slice(
                this.itemPerPage * this.currentPage - this.itemPerPage,
                this.itemPerPage * this.currentPage
            ));
        },
    },
};
</script>
<style scoped>
li {
    list-style: none;
}
.list-products {
    width: 1140px;
    margin: auto;
    margin-top: 100px;
    margin-bottom: 60px;
}
.sort {
    display: flex;
}
.sort p {
    line-height: 30px;
    margin-right: 30px;
}
.sort select {
    border: 1px solid gainsboro;
    width: 500px;
    height: 30px;
}
ul {
    width: 1140px;
    padding-top: 30px;
    display: flex;
    flex-basis: 20%;
    flex-wrap: wrap;
}
.list-item {
    display: block;
}
.li {
    flex-basis: 10%;
    padding: 15px;
}
.item {
    width: 250px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
}

.item:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
}
.item img {
    height: 250px;
}
/* Add some padding inside the card container */
.container {
    padding: 2px 16px;
}
p {
    font-size: 13px;
    margin: 4px;
}
.page ul {
    display: flex;
    margin: 0 auto;
    text-align: left;
    justify-content: center;
}
.page ul li {
    margin: 3px;
    border: 1px solid rgb(211, 211, 211);
    cursor: pointer;
}
.page ul li p {
    display: inline-block;
    margin: 0;
    padding: 0;
    line-height: 30px;
    width: 30px;
    text-align: center;
}
</style>
