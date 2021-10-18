<template>
    <div class="Sale" v-cloak>
        <div id="sale">
            <h2>Products</h2>
            <a href="#">View More...</a>
        </div>
        <div class="list-item">
            <ul>
                <li v-for="item in listItem.slice(0, 4)" v-bind:key="item.id">
                    <div class="item" @click="move(item.id)">
                        <img
                            :src="baseImgUrl + item.mainimg.path"
                            alt="product"
                            style="width:100%"
                        />
                        <div class="container">
                            <p>
                                <b>Name : {{ item.name }}</b>
                            </p>
                            <p>
                                {{ item.desciption }}
                            </p>
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
</template>

<script>
import axios from "axios";
export default {
    name: "Items",
    props: {
        msg: String,
    },
    mounted() {
        this.get();
    },
    data() {
        return {
            listItem: [],
            baseImgUrl: "http://127.0.0.1:8089/",
        };
    },
    methods: {
        async get() {
            try {
                const res = await axios.get(`http://localhost:3000/item`);
                this.listItem = this.cutSrc(res.data);
                // this.newList = this.listItem.sort((a, b) => {
                //     let fa = a.name.toLowerCase(),
                //         fb = b.name.toLowerCase();

                //     if (fa < fb) {
                //         return -1;
                //     }
                //     if (fa > fb) {
                //         return 1;
                //     }
                //     return 0;
                // });
            } catch (e) {
                console.log(e);
            }
        },
        cutSrc(data) {
            const newData = data.map((item) => {
                let a = item.mainimg.path;
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
                item.mainimg.path = b;
                return item;
            });
            return newData;
        },
        move(id) {
            console.log(id);
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
</style>
