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
                    <div class="attributes">
                        <ul>
                            <li
                                v-for="(item, i) in attributeList"
                                v-bind:key="item.id"
                                v-on:click="selectAtt(item.id)"
                                @click="current = i"
                                v-bind:class="{ current: i == current }"
                            >
                                <p v-if="item.color">
                                    {{ item.color }}
                                </p>
                                <p v-else>{{ item.size }}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="input">
                        <input
                            :disabled="true"
                            v-model="quantity"
                            type="text"
                        />
                        <button
                            @click="minus"
                            type="button"
                            class="btn btn-danger minus"
                        >
                            -
                        </button>
                        <button
                            @click="plus"
                            type="button"
                            class="btn btn-primary plus"
                        >
                            +
                        </button>
                    </div>
                    <br /><br />
                    <div class="buy">
                        <button
                            @click="buy(obj.id)"
                            type="button"
                            class="btn btn-primary"
                        >
                            BUY NOW
                        </button>
                    </div>
                    <div
                        v-show="show"
                        class="alert alert-success alert"
                        role="alert"
                    >
                        Added to Order.
                    </div>
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
            } catch (e) {
                console.log(e);
            }
        },
        async getA() {
            const res = await axios.get(
                `http://localhost:3000/admin/attribute/${this.id}`
            );
            this.attributeList = res.data;
            this.currentAttribute = res.data[0].id;
        },
        changeImage(src) {
            this.mainImg = src;
            this.rf++;
        },
        renderImg() {
            return this.baseImgUrl + this.mainImg;
        },
        minus() {
            if (this.quantity == 1) {
                this.quantity = 1;
            } else {
                this.quantity--;
            }
        },
        plus() {
            this.quantity++;
        },
        selectAtt(id) {
            this.currentAttribute = id;
        },
        async buy(id) {
            try {
                const create = await axios.post(
                    `http://localhost:3000/myorder/create`,
                    {
                        itemId: id,
                        itemQuantity: this.quantity,
                        itemAttributeId: this.currentAttribute,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            token: `Bearer ${localStorage.accessToken}`,
                        },
                    }
                );
                this.show = true;
                console.log(create);
            } catch (e) {
                this.log = e.response.data.message;
            }
        },
    },
    async mounted() {
        await this.get();
        await this.getA();
    },
    data() {
        return {
            id: this.$route.params.id,
            obj: [],
            list: [],
            attributeList: [],
            currentAttribute: "",
            baseImgUrl: "http://127.0.0.1:8089/",
            mainImg: "",
            rf: 0,
            quantity: 1,
            current: 0,
            show: false,
        };
    },
};
</script>
<style scoped>
.attributes {
    height: 24px;
}
.current {
    background: black;
}
.attributes ul {
    display: flex;
    margin: 20px 0px;
}
.attributes ul li {
    margin: 0px 5px 0px 0px;
    width: 60px;
    border: 1px solid rgb(206, 206, 206);
    border-radius: 5px;
}
.attributes ul li p {
    margin: 0px 5px 0px 0px;
    font-size: 15px;
    line-height: 30px;
    text-align: center;
    border-bottom: 0px;
    cursor: pointer;
}
.alert {
    margin-top: 70px;
}
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
input {
    border: 1px solid black;
    width: 80px;
}
input:focus {
    outline: none;
}
.input {
    display: block;
    position: relative;
    margin: 20px 0px;
}
input {
    display: block;
    position: absolute;
    left: 0px;
}
.minus {
    width: 35px;
    line-height: 12.5px;
    position: absolute;
    left: 80px;
}
.plus {
    width: 35px;
    line-height: 12.5px;
    position: absolute;
    left: 115px;
}
</style>
