<template>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="admin-all" v-cloak>
        <div class="sidebar-container">
            <div class="sidebar-logo">
                Shopping
            </div>
            <ul class="sidebar-navigation">
                <li class="header">Navigation</li>
                <router-link to="/admin">
                    <li>
                        <a href="#">
                            <i class="fa fa-home" aria-hidden="true"></i>
                            Homepage
                        </a>
                    </li>
                </router-link>
                <li class="header">Dashboard</li>
                <li>
                    <a href="#" @click="showP">
                        <i class="fa fa-tachometer" aria-hidden="true"></i>
                        Products
                    </a>
                </li>
                <div v-show="sProducts" :key="ref">
                    <ul>
                        <router-link to="/admin/product/all">
                            <li>All</li>
                        </router-link>
                        <router-link to="/admin/product/create">
                            <li>Create</li>
                        </router-link>
                    </ul>
                </div>
                <li>
                    <a href="#" @click="showA">
                        <i class="fa fa-tachometer" aria-hidden="true"></i>
                        Attributes
                    </a>
                </li>
                <div v-show="sAttribute" :key="ref1">
                    <ul>
                        <li>All</li>
                        <li>Item Attribute</li>
                        <li>Create</li>
                        <li>Update</li>
                        <li>Delete</li>
                    </ul>
                </div>
                <li>
                    <a href="#" @click="showF">
                        <i class="fa fa-tachometer" aria-hidden="true"></i>
                        FlashSale
                    </a>
                </li>
                <div v-show="sFlashSale" :key="ref2">
                    <ul>
                        <li>All</li>
                        <li>Active</li>
                        <li>Inactive</li>
                        <li>Create</li>
                        <li>Update</li>
                    </ul>
                </div>
                <li>
                    <a href="#" @click="showV">
                        <i class="fa fa-tachometer" aria-hidden="true"></i>
                        Voucher
                    </a>
                </li>
                <div v-show="sVoucher" :key="ref3">
                    <ul>
                        <li>All</li>
                        <li>Inactive</li>
                        <li>Create</li>
                        <li>Delete</li>
                    </ul>
                </div>
            </ul>
        </div>

        <div class="content-container">
            <div class="container-fluid">
                <div class="title">
                    <h1>All Product</h1>
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Barcode</th>
                                <th scope="col">Import Price</th>
                                <th scope="col">Selling Price</th>
                                <th scope="col">Weight</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Description</th>
                                <th scope="col">CategoryId</th>
                                <th scope="col">CategoryName</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody :key="rf">
                            <tr v-for="(item, i) in pageFilter" :key="item.id">
                                <th scope="row">{{ i }}</th>
                                <td>{{ item.id }}</td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.barcode }}</td>
                                <td>{{ item.importPrice }}</td>
                                <td>{{ item.sellingPrice }}</td>
                                <td>{{ item.weight }}</td>
                                <td>{{ item.quantity }}</td>
                                <td>{{ item.desciption }}</td>
                                <td>{{ item.categoryId }}</td>
                                <td>{{ item.categoryName }}</td>
                                <td>
                                    <button
                                        type="button"
                                        class="btn btn-success"
                                        @click="move(item.id)"
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button
                                        @click="remove(item.id)"
                                        type="button"
                                        class="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
axios.defaults.headers.common["token"] = "Bearer " + localStorage.aAccessToken;
export default {
    name: "AdminPAll",
    props: {
        msg: String,
    },
    async mounted() {
        await this.getAllP();
    },
    data() {
        return {
            sProducts: false,
            ref: 0,
            sAttribute: false,
            ref1: 0,
            sFlashSale: false,
            ref2: 0,
            sVoucher: false,
            ref3: 0,
            listItem: [],
            itemPerPage: 10,
            cutPage: [],
            pageCount: "",
            currentPage: 1,
            key: "",
        };
    },
    methods: {
        move(id) {
            this.$router.push(`/admin/product/editinfo/${id}`);
        },
        async reRender() {
            await this.getAllP();
            this.ref++;
        },
        async remove(id) {
            await axios.post(`http://localhost:3000/admin/item/delete`, {
                id: id,
            });
            await this.reRender();
        },
        async getAllP() {
            try {
                const res = await axios.get(`http://localhost:3000/item`);
                this.listItem = res.data;
            } catch (e) {
                console.log(e);
            }
        },
        showP() {
            if (this.sProducts == false) {
                this.sProducts = true;
                this.ref++;
            } else {
                this.sProducts = false;
                this.ref++;
            }
        },
        showA() {
            if (this.sAttribute == false) {
                this.sAttribute = true;
                this.ref1++;
            } else {
                this.sAttribute = false;
                this.ref1++;
            }
        },
        showF() {
            if (this.sFlashSale == false) {
                this.sFlashSale = true;
                this.ref2++;
            } else {
                this.sFlashSale = false;
                this.ref2++;
            }
        },
        showV() {
            if (this.sVoucher == false) {
                this.sVoucher = true;
                this.ref3++;
            } else {
                this.sVoucher = false;
                this.ref3++;
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
ul li {
    list-style: none;
}
.sidebar-container {
    position: fixed;
    width: 220px;
    height: 100%;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background: #1a1a1a;
    color: #fff;
}

.content-container {
    padding-top: 20px;
}

.sidebar-logo {
    padding: 10px 15px 10px 30px;
    font-size: 20px;
    background-color: #2574a9;
}

.sidebar-navigation {
    padding: 0;
    margin: 0;
    list-style-type: none;
    position: relative;
}

.sidebar-navigation li {
    background-color: transparent;
    position: relative;
    display: inline-block;
    width: 100%;
    line-height: 25px;
    margin-bottom: 2px;
    cursor: pointer;
}

.sidebar-navigation li a {
    text-align: left;
    padding: 10px 0px 10px 15px;
    display: block;
    color: #fff;
}

.sidebar-navigation li .fa {
    margin-right: 10px;
}

.sidebar-navigation li a:active,
.sidebar-navigation li a:hover,
.sidebar-navigation li a:focus {
    text-decoration: none;
    outline: none;
}

.sidebar-navigation li::before {
    background-color: #2574a9;
    position: absolute;
    content: "";
    height: 100%;
    left: 0;
    top: 0;
    -webkit-transition: width 0.2s ease-in;
    transition: width 0.2s ease-in;
    width: 3px;
    z-index: -1;
}

.sidebar-navigation li:hover::before {
    width: 100%;
}

.sidebar-navigation .header {
    font-size: 12px;
    text-transform: uppercase;
    background-color: #151515;
    padding: 10px 15px 10px 30px;
}

.sidebar-navigation .header::before {
    background-color: transparent;
}

.content-container {
    padding-left: 220px;
    background-color: #e9ecef;
    height: 961px;
}
.title {
    margin-bottom: 2rem;
    background-color: #e9ecef;
    border-radius: 0.3rem;
}
</style>
