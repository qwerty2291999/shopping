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
                <tbody :key="ref">
                    <tr v-for="(item, i) in list" :key="item.id">
                        <th scope="row">{{ i }}</th>
                        <td>{{ item.id }}</td>
                        <td>Chưa Làm</td>
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
            <div class="input-group mb-3 code">
                <input
                    type="text"
                    class="form-control"
                    v-model="code"
                    aria-describedby="basic-addon2"
                />
                <div class="input-group-append">
                    <button
                        @click="reRender"
                        class="btn btn-outline-danger"
                        type="button"
                    >
                        Apply Code
                    </button>
                </div>
            </div>
            <div class="total">
                <div class="info">
                    <h5>Total Price :</h5>
                    <br />
                    <p>{{ total }}</p>
                    <br />
                    <p v-if="code != null">Code Applied : {{ code }}</p>
                    <p v-else>
                        Code Applied : None
                    </p>
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
                this.code = res.data.code;
            } catch (e) {
                console.log(e);
            }
        },
        async reRender() {
            await this.get();
            await this.getPrice();
            this.ref++;
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
            code: "",
            ref: 0,
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
.code {
    width: 200px;
}
</style>
