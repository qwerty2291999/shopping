<template>
    <div class="Sale" v-cloak>
        <div id="sale">
            <h2>Flash Sales</h2>
            <a href="#">View More...</a>
        </div>
        <div class="list-item">
            <p v-show="true">{{ log }}</p>
            <ul>
                <li v-for="item in saleList.slice(0, 4)" v-bind:key="item.id">
                    <div class="item">
                        <img
                            :src="baseImgUrl + item.itemImg.path"
                            alt="product"
                            style="width:100%"
                            @click="move(item.itemId)"
                        />
                        <div class="container" @click="move(item.itemId)">
                            <p>
                                <b>Name : {{ item.itemName }}</b>
                            </p>
                            <p style="color:red" :key="renderKey">
                                Time Left :
                                {{ timeLeft(item.endDate) }}
                            </p>
                            <p>
                                <del>Price :{{ item.itemPrice }}</del>
                            </p>
                            <p style="color:red">
                                New Price : {{ item.itemNewPrice }}
                            </p>
                        </div>
                        <button
                            @click="buy(item.itemId, item.id)"
                            style="font-size:10px;
                                margin-bottom: 12px"
                            type="button"
                            class="btn btn-primary"
                        >
                            Buy Now : Left {{ item.quantity }}
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Sale",
    props: {
        msg: String,
    },
    data() {
        return {
            saleList: [],
            baseImgUrl: "http://127.0.0.1:8089/",
            renderKey: 0,
            attrId: "",
            attrInfo: "",
            log: "",
            show: false,
        };
    },
    mounted() {
        this.get();
        this.reRender();
    },
    methods: {
        reRender() {
            setInterval(() => {
                this.renderKey++;
            }, 1000);
        },
        async get() {
            try {
                const res = await axios.get(`http://localhost:3000/flashsales`);
                this.saleList = this.cutSrc(res.data);
            } catch (e) {
                console.log(e);
            }
        },
        async buy(id, saleId) {
            if (localStorage.accessToken) {
                try {
                    const res = await axios.get(
                        `http://localhost:3000/admin/attribute/${id}`
                    );
                    this.attrId = res.data[0].id;
                    if (res.data[0].color) {
                        res;
                    }
                    const create = await axios.post(
                        `http://localhost:3000/myorder/create`,
                        {
                            flashsaleId: saleId,
                            itemQuantity: 1,
                            itemAttributeId: this.attrId,
                        },
                        {
                            headers: {
                                token: `Bearer ${localStorage.accessToken}`,
                            },
                        }
                    );
                    this.log = `Added item ${create.data.flashsaleId} to order`;
                    console.log(this.log);
                } catch (e) {
                    this.show = true;
                    this.log = e.response.data.message;
                }
            } else {
                this.login();
            }
        },
        timeLeft(end) {
            const sec = 1000;
            const minute = sec * 60;
            const hour = minute * 60;
            const day = hour * 24;
            let dayEndtoMili = new Date(end).getTime();
            let timeLeft = dayEndtoMili - Date.now();
            let timerCountDown = `${Math.floor(timeLeft / day)}d ${Math.floor(
                (timeLeft % day) / hour
            )}h:${Math.floor((timeLeft % hour) / minute)}m:${Math.floor(
                (timeLeft % minute) / sec
            )}s.`;
            return timerCountDown;
        },
        cutSrc(data) {
            const newData = data.map((item) => {
                let a = item.itemImg.path;
                let b = a.replace(/\\/g, "/");
                let length = b.length;
                let result = 0;
                while (length > 0) {
                    length--;
                    if (b.charAt(length) == "/") {
                        result = length;
                        break;
                    }
                }
                b = b.slice(result + 1, b.length);
                item.itemImg.path = b;
                return item;
            });
            return newData;
        },
        move(id) {
            this.$router.push(`/product/${id}`);
        },
        login() {
            this.$router.push(`/auth/login`);
        },
    },
};
</script>

<style scoped>
ul,
li {
    list-style: none;
}
.Sale {
    padding-top: 60px;
    width: 1140px;
    margin: auto;
}
#sale {
    height: 50px;
    width: auto;
    -moz-box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 2px 0px rgba(229, 64, 64, 0.5);
}
#sale h2 {
    float: left;
    color: rgb(229, 64, 64);
    line-height: 50px;
}
#sale a {
    float: right;
    color: rgb(229, 64, 64);
    line-height: 50px;
}
.list-item {
    display: block;
}
ul {
    width: 1140px;
    padding-top: 30px;
    display: flex;
    flex-basis: 20%;
    flex-wrap: wrap;
}
ul li {
    margin: auto;
    flex-basis: 10%;
    padding: 15px;
}
.item {
    width: 250px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    cursor: pointer;
}
.item img {
    width: 250px;
    height: 250px;
}
.item:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
p {
    font-size: 13px;
    margin: 4px;
}

/* Add some padding inside the card container */
.container {
    padding: 2px 16px;
}
</style>
