<template>
    <div v-cloak class="pbody">
        <div class="container">
            <div class="left">
                <div class="mimg">
                    <img :key="rf" :src="renderImg(mainImg)" />
                </div>
                <div class="dimg">
                    <ul class="list-img">
                        <li
                            class="img"
                            v-for="item in list"
                            v-bind:key="item.originalname"
                        >
                            <img
                                v-on:click="changeImage(item.filename)"
                                :src="baseImgUrl + item.filename"
                                alt="product"
                            />
                        </li>
                    </ul>
                </div>
            </div>
            <div class="right">
                <div v-bind:key="obj.id" class="data">
                    <h5>Name : {{ obj.name }}</h5>
                    <p>Price : {{ obj.sellingPrice }}</p>
                    <p>Barcode : {{ obj.barcode }}</p>
                    <p>In storage : {{ obj.quantity }}</p>
                    <p>Description : {{ obj.desciption }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "ProductBody",
    props: {
        msg: String,
    },
    methods: {
        async get() {
            try {
                const res = await axios.get(
                    `http://localhost:3000/item/${this.id}`
                );
                this.obj = res.data;
                this.list = res.data.detailimgs;
                this.mainImg = res.data.mainimg.filename;
                console.log(this.list);
            } catch (e) {
                console.log(e);
            }
        },
        changeImage(src) {
            this.mainImg = src;
            this.rf++;
        },
        renderImg() {
            return this.baseImgUrl + this.mainImg;
        },
    },
    mounted() {
        this.get();
        this.renderImg();
    },
    data() {
        return {
            id: this.$route.params.id,
            obj: [],
            list: [],
            baseImgUrl: "http://127.0.0.1:8089/",
            mainImg: "",
            rf: 0,
        };
    },
};
</script>
<style scoped>
.container {
    width: 1140px;
    display: flex;
    justify-content: space-between;
}
.left {
    padding-top: 100px;
}
.right {
    height: 600px;
    width: 500px;
    margin: 100px 100px 100px 0px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.mimg {
    width: 350px;
    height: 350px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.mimg img {
    width: 350px;
    height: 350px;
}
.dimg {
    margin: 17px 30px 30px 0px;
    width: 350px;
}
.list-img {
    display: flex;
    margin: auto;
    flex-wrap: wrap;
}
.img {
    margin: 8px 8px 8px 0px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
}
.img img {
    width: 50px;
    height: 50px;
}
ul,
li {
    list-style: none;
}
.data {
    display: block;
    margin: 90px;
}
.data h5 {
    text-align: left;
    margin: 20px 0px;
    border-bottom: 1px solid rgb(206, 206, 206);
}
.data p {
    text-align: left;
    margin: 20px 0px;
    border-bottom: 1px solid rgb(206, 206, 206);
}
.data p:first-child {
    color: red;
}
</style>
