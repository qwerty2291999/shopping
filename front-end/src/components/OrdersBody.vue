<template>
    <div v-cloak class="obody">
        <div class="container">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Img</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        <th scope="col">Attribute</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in list" :key="item.id">
                        <th scope="row">{{ i }}</th>
                        <td>{{ item.id }}</td>
                        <td>Otto</td>
                        <td>{{ item.itemName }}</td>
                        <td>{{ item.itemPrice }}</td>
                        <td>{{ item.itemQuantity }}</td>
                        <td>{{ item.total }}</td>
                        <td v-if="item.attributeSize">
                            {{ item.attributeSize }}
                        </td>
                        <td v-else>{{ item.attributeColor }}</td>
                        <td>
                            <button type="button" class="btn btn-danger">
                                Remove
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="total">
                <div class="info">
                    <h5>Total Price :</h5>
                    <br />
                    <p>{{ total }}</p>
                    <br />
                    <button type="button" class="btn btn-success">
                        Complete !
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "OrderBody",
    props: {
        msg: String,
    },
    methods: {
        async get() {
            try {
                const res = await axios.get(`http://localhost:3000/myorder`, {
                    headers: {
                        token: `Bearer ${localStorage.accessToken}`,
                    },
                });
                this.list = res.data;
            } catch (e) {
                console.log(e);
            }
        },
        async getPrice() {
            try {
                const res = await axios.get(
                    `http://localhost:3000/myorderprice`,
                    {
                        headers: {
                            token: `Bearer ${localStorage.accessToken}`,
                        },
                    }
                );
                this.total = res.data.totalPrice;
            } catch (e) {
                console.log(e);
            }
        },
    },
    async mounted() {
        await this.get();
        await this.getPrice();
    },
    data() {
        return {
            list: [],
            total: "",
        };
    },
};
</script>
<style scoped>
.container {
    width: 1140px;
    margin-top: 100px;
}
.total {
    width: 1140px;
    margin-top: 100px;
    text-align: left;
}
.info {
    border-top: 1px solid rgb(206, 206, 206);
}
.info h5 {
    display: inline-block;
    margin-top: 20px;
    border-bottom: 1px solid rgb(206, 206, 206);
}
.info p {
    border-bottom: 1px solid rgb(206, 206, 206);
    display: inline-block;
}
</style>
