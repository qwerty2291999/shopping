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
                            <button
                                @click="remove1(item.id)"
                                type="button"
                                class="btn btn-danger"
                            >
                                Remove
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-show="show" class="alert alert-success alert" role="alert">
                {{ log }}
            </div>
            <div v-show="show1" class="alert alert-danger alert" role="alert">
                {{ log1 }}
            </div>
            <div class="input-group mb-3 code">
                <input
                    type="text"
                    class="form-control"
                    v-model="code"
                    aria-describedby="basic-addon2"
                />

                <div class="input-group-append">
                    <button
                        @click="applyCode"
                        class="btn btn-outline-success"
                        type="button"
                    >
                        Apply Code
                    </button>
                    <button
                        @click="removeCode"
                        type="button"
                        class="btn btn-outline-danger"
                    >
                        X
                    </button>
                </div>
            </div>
            <div class="total">
                <div class="info">
                    <h5>Total Price :</h5>
                    <br />
                    <p :key="ref">{{ total }}</p>
                    <br />
                    <p v-if="code != null">Code Applied : {{ code }}</p>
                    <p v-else>
                        Code Applied : None
                    </p>
                    <br />
                    <button
                        @click="completeOrder"
                        type="button"
                        class="btn btn-success"
                    >
                        Complete !
                    </button>
                </div>
            </div>
            <div class="address">
                <div
                    v-show="show2"
                    class="alert alert-success alert"
                    role="alert"
                >
                    {{ log2 }}
                </div>
                <p class="phone">Phone Number</p>
                <input
                    type="text"
                    class="form-control"
                    v-model="phoneNumber"
                    aria-describedby="basic-addon2"
                />
                <p class="add">Address</p>
                <input
                    type="text"
                    class="form-control"
                    v-model="address"
                    aria-describedby="basic-addon2"
                />
                <button
                    @click="updateAdress"
                    type="button"
                    class="btn btn-success"
                >
                    Update Address.
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
axios.defaults.headers.common["token"] = "Bearer " + localStorage.accessToken;
export default {
    name: "OrderBody",
    props: {
        msg: String,
    },
    methods: {
        async completeOrder() {
            try {
                const res = await axios.post(
                    `http://localhost:3000/myorder/complete`
                );
                console.log(res);
                this.show2 = true;
                this.log2 = `Your order has been placed`;
            } catch (e) {
                const err = e.response.data.message;
                this.log2 = err;
                this.show2 = true;
            }
        },
        async get() {
            try {
                const res = await axios.get(`http://localhost:3000/myorder`, {
                    headers: {
                        "Content-Type": "application/json",
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
                this.phoneNumber = res.data.userPhoneNumber;
                this.address = res.data.userAddress;
            } catch (e) {
                console.log(e);
            }
        },
        async reRender() {
            await this.get();
            await this.getPrice();
            this.ref++;
        },
        async remove1(id) {
            await axios.post(
                `http://localhost:3000/myorder/delete`,
                {
                    id: id,
                },
                {
                    headers: {
                        token: `Bearer ${localStorage.accessToken}`,
                    },
                }
            );
            await this.reRender();
        },
        async removeCode(id) {
            await axios.post(
                `http://localhost:3000/myorder/removevoucher`,
                {
                    id: id,
                },
                {
                    headers: {
                        token: `Bearer ${localStorage.accessToken}`,
                    },
                }
            );
            await this.reRender();
        },
        async applyCode() {
            try {
                const apply = await axios.post(
                    `http://localhost:3000/myorder/applyvoucher`,
                    {
                        code: this.code.toUpperCase(),
                    },
                    {
                        headers: {
                            token: `Bearer ${localStorage.accessToken}`,
                        },
                    }
                );
                this.log = `Applied Voucher ${this.code}`;
                this.show1 = false;
                this.show = true;
                console.log(apply);
                await this.reRender();
            } catch (e) {
                this.show = false;
                this.show1 = true;
                const err = e.response.data.message;
                this.log1 = err + ` ${this.code.toUpperCase()}`;
                await this.reRender();
            }
        },
        async updateAdress() {
            const update = await axios.post(
                `http://localhost:3000/myorder/updateaddress`,
                {
                    userPhoneNumber: this.phoneNumber,
                    userAddress: this.address,
                },
                {
                    headers: {
                        token: `Bearer ${localStorage.accessToken}`,
                    },
                }
            );
            console.log(update);
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
            log: "",
            log1: "",
            log2: "",
            show: false,
            show1: false,
            show2: false,
            phoneNumber: "",
            address: "",
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
    width: 250px;
}
.address {
    text-align: left;
    padding-top: 30px;
}
.address > input {
    width: 350px;
}
.address > button {
    margin-top: 20px;
}
.phone {
    display: inline-block;
    border-bottom: 1px solid rgb(206, 206, 206);
}
.add {
    margin-top: 20px;
    border-bottom: 1px solid rgb(206, 206, 206);
    display: inline-block;
}
</style>
