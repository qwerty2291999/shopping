<template>
    <div class="voucher">
        <div id="voucher">
            <h2>Vouchers</h2>
            <a href="#">View More...</a>
        </div>
        <div class="items">
            <ul class="list-item">
                <li
                    v-for="item in voucherList.slice(0, 4)"
                    v-bind:key="item.id"
                    class="item"
                >
                    <div>
                        <p v-if="item.itemId" class="id">
                            Apply for Id: {{ item.itemId }}
                        </p>
                        <p v-if="item.categoryId" class="catId">
                            Apply for CategoryId: {{ item.categoryId }}
                        </p>
                        <p
                            v-if="
                                item.categoryId == null && item.itemId == null
                            "
                            class="catId"
                        >
                            Apply for All
                        </p>
                        <p style="color:red">
                            Time Left : {{ countDown(item.endDate) }}
                        </p>
                        <p class="code">{{ item.code }}</p>
                    </div>
                    <button type="button" class="btn btn-primary">
                        Shopping Now
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Vouchers",
    props: {
        msg: String,
    },
    mounted() {
        this.get();
    },
    data() {
        return {
            voucherList: [],
            show: true,
        };
    },
    methods: {
        async get() {
            const res = await axios.get(
                `http://localhost:3000/voucher/find/active`
            );
            this.voucherList = res.data;
        },
        countDown(time) {
            const sec = 1000;
            const min = sec * 60;
            const hr = min * 60;
            const day = hr * 24;
            const dayEndtoMili = new Date(time).getTime();
            const timeLeft = dayEndtoMili - Date.now();
            const timerCountDown = `${Math.floor(timeLeft / day)}d ${Math.floor(
                (timeLeft % day) / hr
            )}h:${Math.floor((timeLeft % hr) / min)}m:${Math.floor(
                (timeLeft % min) / sec
            )}s.`;
            return timerCountDown;
        },
    },
};
</script>

<style scoped>
ul,
li {
    list-style: none;
}
.voucher {
    padding-top: 60px;
    width: 1140px;
    margin: auto;
}
#voucher {
    height: 50px;
    width: auto;
    -moz-box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 2px 0px rgba(229, 64, 64, 0.5);
}
#voucher h2 {
    float: left;
    color: rgb(229, 64, 64);
    line-height: 50px;
}
#voucher a {
    float: right;
    color: rgb(229, 64, 64);
    line-height: 50px;
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
.items {
    padding-top: 60px;
}
.list-item {
    display: flex;
    flex-wrap: wrap;
}
.item {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
}
.item div {
    width: 220px;
    height: 120px;
    word-wrap: break-word;
    position: relative;
}
.item button {
    font-size: 10px;
}
.item:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.code {
    font-size: 23px;
    color: brown;
    margin: auto;
}
p {
    font-size: 13px;
    margin: 4px;
}
</style>
