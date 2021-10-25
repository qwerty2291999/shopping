<template>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="admin-add" v-cloak>
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
                    <h1>Create Product</h1>
                </div>
                <div class="form-coltrol" v-on:submit.prevent="onSubmit">
                    <form>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Name</label>
                            <input
                                class="form-control"
                                name="name"
                                placeholder="Product Name"
                                v-model="name"
                            />
                            <label for="importPrice">Import Price</label>
                            <input
                                class="form-control"
                                name="importPrice"
                                placeholder="Import Price"
                                v-model="importPrice"
                            />
                            <label for="sellingPrice">Selling Price</label>
                            <input
                                class="form-control"
                                name="sellingPrice"
                                placeholder="Selling Price"
                                v-model="sellingPrice"
                            />
                            <label for="quantity">Quantity</label>
                            <input
                                class="form-control"
                                name="quantity"
                                placeholder="Quantity"
                                v-model="quantity"
                            />
                            <label for="desciption">Description</label>
                            <input
                                class="form-control"
                                name="desciption"
                                placeholder="Description"
                                v-model="description"
                            />
                            <label for="weight">Weight</label>
                            <input
                                class="form-control"
                                name="weight"
                                placeholder="Weight"
                                v-model="weight"
                            />
                            <label for="categoryId">Category</label>
                            <br />
                            <select
                                class="form-select select-box"
                                aria-label="Default select example"
                                v-model="selectedCat"
                            >
                                <option
                                    v-for="cat in category"
                                    :key="cat.id"
                                    :value="cat.id"
                                    >{{ cat.category }}</option
                                >
                            </select>
                            <br />
                            <label for="mainimg">Main Img</label>
                            <input
                                type="file"
                                class="form-control-file mainimg"
                                name="maining"
                                @change="handleUpload($event)"
                            />
                            <label for="imgs">Imgs</label>
                            <input
                                @change="handleUploads($event)"
                                type="file"
                                multiple="multiple"
                                class="form-control-file mainimg"
                                name="imgs"
                            />
                        </div>
                        <button type="submit" class="btn btn-success">
                            Create Product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
axios.defaults.headers.common["token"] = "Bearer " + localStorage.aAccessToken;
export default {
    name: "AdminPAdd",
    props: {
        msg: String,
    },
    async mounted() {
        await this.getCategory();
    },
    data() {
        return {
            productLength: "",
            attributeLenght: "",
            categoryLenght: "",
            voucherLenght: "",
            sProducts: false,
            ref: 0,
            sAttribute: false,
            ref1: 0,
            sFlashSale: false,
            ref2: 0,
            sVoucher: false,
            ref3: 0,
            category: [],
            name: "",
            importPrice: "",
            sellingPrice: "",
            weight: "",
            quantity: "",
            description: "",
            selectedCat: "",
            file: "",
            files: [],
        };
    },
    methods: {
        async onSubmit() {
            const form = new FormData();
            form.append("name", this.name);
            form.append("importPrice", this.importPrice);
            form.append("sellingPrice", this.sellingPrice);
            form.append("weight", this.weight);
            form.append("quantity", this.quantity);
            form.append("desciption", this.description);
            form.append("categoryId", this.selectedCat);
            form.append("mainimg", this.file);
            for (let i = 0; i < this.files.length; i++) {
                let file = this.files[i];
                form.append("imgs", file);
            }
            try {
                const res = await axios.post(
                    `http://localhost:3000/admin/item/create`,
                    form,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                console.log(res);
            } catch (e) {
                console.log(e.response.data.message);
            }
        },
        handleUpload(e) {
            this.file = e.target.files[0];
        },
        handleUploads(e) {
            this.files = e.target.files;
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
        async getCategory() {
            try {
                const res = await axios.get(
                    `http://localhost:3000/admin/category`
                );
                this.category = res.data;
            } catch (e) {
                console.log(e);
            }
        },
    },
};
</script>
<style scoped>
.select-box {
    display: block;
    width: 400px;
    border: 1px solid #e9ecef;
    height: 40px;
    border-radius: 5px;
}
.mainimg {
    background-color: white;
    border: 1px solid #e9ecef;
    border-radius: 5px;
}
.form-coltrol {
    display: block;
    margin: auto;
    width: 400px;
}
.list-count ul {
    display: flex;
    flex-wrap: wrap;
    margin: 200px auto;
    margin-left: 170px;
}
.list-count li {
    list-style: none;
    width: 300px;
    height: 200px;
    background-color: rgb(149, 190, 229);
    margin: 20px;
    flex-basis: 20%;
    border-radius: 7px;
    display: flex;
}
.text {
    width: 200px;
}
.text h5 {
    margin-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgb(152, 156, 160);
}
.count {
    display: flex;
}
.text .total {
    margin-top: 15px;
    width: 100px;
    display: block;
    line-height: 100px;
    font-size: 20px;
}
.text .num {
    margin-top: 15px;
    display: block;
    line-height: 100px;
    width: 60px;
    font-size: 60px;
    color: rgb(219, 48, 73);
}
.icon {
    border-right: 1px solid rgb(152, 156, 160);
    width: 100px;
    line-height: 200px;
}
.icon img {
    width: 50px;
    height: 50px;
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
