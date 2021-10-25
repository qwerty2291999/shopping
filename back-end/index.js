const express = require('express');
const cron = require('node-cron');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const connect = require('./configs/db');
const auth = require('./src/auth/auth.routes');
const user = require('./src/user/user.routes');
const item = require('./src/item/item.routes');
const category = require('./src/category/category.routes');
const voucher = require('./src/voucher/voucher.routes');
const sale = require('./src/flashsale/flashsale.routes');
const order = require('./src/order/order.routes');
const adminAuth = require('./src/admin/auth/auth.routes');
const adminAttribute = require('./src/admin/attribute/attribute.routes');
const adminCategory = require('./src/admin/category/category.routes');
const adminItems = require('./src/admin/item/item.routes');
const adminSale = require('./src/admin/flashsale/flashsale.routes');
const adminVoucher = require('./src/admin/voucher/voucher.routes');
const {
  findExpired,
  updateOne,
  findInactive,
} = require('./src/admin/flashsale/flashsale.services');
const { findVExpired, findVInactive, updateV } = require('./src/admin/voucher/voucher.services');
const { findCExpired, deleteForgot } = require('./src/auth/auth.services');
const { STATUS } = require('./configs/enum');

// Use Import
const app = express();
app.use(express());
app.use(express.json());
app.use(cors());
app.use(auth);
app.use(user);
app.use(item);
app.use(category);
app.use(voucher);
app.use(sale);
app.use(order);
app.use(adminAuth);
app.use(adminAttribute);
app.use(adminCategory);
app.use(adminItems);
app.use(adminSale);
app.use(adminVoucher);
app.use(cookieParser());
// Route
app.get('/', (req, res) => {
  res.json('Index');
});
// Global Error Handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.code).send({ message: err.message });
});
app.all('*', (req, res) => {
  res.status(404).send({ message: `${req.url} not found` });
});
// Cron Job
const findExFlash = async () => {
  const expired = await findExpired();
  if (expired.length > 0) {
    expired.map(async (i) => {
      await updateOne({ id: i.id }, { status: STATUS.expired });
    });
  }
};
const findInFlash = async () => {
  const inActive = await findInactive();
  if (inActive.length > 0) {
    inActive.map(async (i) => {
      await updateOne({ id: i.id }, { status: STATUS.active });
    });
  }
};
const findExVouchers = async () => {
  const expired = await findVExpired();
  if (expired.length > 0) {
    expired.map(async (i) => {
      await updateV({ id: i.id }, { status: STATUS.expired });
    });
  }
};
const findInVouchers = async () => {
  const inActive = await findVInactive();
  if (inActive.length > 0) {
    inActive.map(async (i) => {
      await updateV({ id: i.id }, { status: STATUS.active });
    });
  }
};
const findExCode = async () => {
  const expired = await findCExpired();
  if (expired.length > 0) {
    expired.map(async (i) => {
      await deleteForgot({ id: i.id });
    });
  }
};
cron.schedule('1 * * * * *', () => {
  findExFlash();
  findInFlash();
  findExVouchers();
  findInVouchers();
  findExCode();
});

// Server Connect
app.listen(3000, async () => {
  await connect();
});
module.exports = app;
