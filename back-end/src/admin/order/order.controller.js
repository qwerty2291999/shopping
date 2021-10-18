/* eslint-disable object-curly-newline */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
const HTTP = require('http-status-codes');
const {
  createMain,
  findMain,
  findSale,
  findItem,
  create,
  findOrders,
  findOrder,
  updateOrderMain,
  updateOrder,
  findVoucher,
  applyCate,
  applyId,
  applyIdnCate,
  applyAll,
  deleteOrder,
  updateQ,
} = require('./order.services');
const { joiCreate, joiId } = require('./order.validation');
const Error = require('../../errors/errors');
const { STATUS } = require('../../configs/enum');
const { totalValueObject, discountOne } = require('../../functions/numbers');

const err = new Error();

async function all(req, res, next) {
  const userId = req.user;
  const findOrderMain = await findMain({ userId: userId.id }, { status: STATUS.awaitpurchase });
  if (!findOrderMain) {
    next(err.notFound());
  } else {
    const findOrder = await findOrders({ orderId: findOrderMain.id });
    res.json(findOrder);
  }
}
async function createOrder(req, res, next) {
  const userId = req.user;
  const data = req.body;
  const validate = joiCreate.validate(data);
  if (validate.error) {
    validate.error.code = HTTP.StatusCodes.BAD_REQUEST;
    next(validate.error);
  } else {
    const findBeforeCreate = await findMain(
      { userId: userId.id },
      { status: STATUS.awaitpurchase },
    );
    if (findBeforeCreate == null) {
      const createOrderMain = await createMain({ userId: userId.id });
      // if contains flashsaleId
      if (data.flashsaleId) {
        const findFlashSale = await findSale({ id: data.flashsaleId });
        if (!findFlashSale) {
          next(err.notFound());
        } else if (findFlashSale.status === STATUS.inactive) {
          next(err.notAvailable());
        } else {
          //
          data.orderId = createOrderMain.id;
          data.userId = userId.id;
          data.itemId = findFlashSale.itemId;
          data.itemName = findFlashSale.itemName;
          data.itemPrice = findFlashSale.itemNewPrice;
          data.total = data.itemQuantity * data.itemPrice;
          data.itemImg = findFlashSale.itemImg;
          data.categoryId = findFlashSale.categoryId;
          //
          const doc = await create(data);
          const findOd = await findOrders({ orderId: createOrderMain.id });
          await updateOrderMain(
            { id: createOrderMain.id },
            { totalPrice: totalValueObject(findOd) },
          );
          res.json(doc);
        }
      } else if (data.itemId) {
        const findExistItem = await findItem({ id: data.itemId });
        if (!findExistItem) {
          next(err.notFound());
        } else if (findExistItem.categoryStatus === STATUS.inactive) {
          next(err.notAvailable());
        } else {
          //
          data.orderId = createOrderMain.id;
          data.userId = userId.id;
          data.itemId = findExistItem.id;
          data.itemName = findExistItem.name;
          data.itemPrice = findExistItem.sellingPrice;
          data.total = data.itemQuantity * data.itemPrice;
          data.itemImg = findExistItem.mainimg;
          data.categoryId = findExistItem.categoryId;
          //
          const doc = await create(data);
          const findOd = await findOrders({ orderId: createOrderMain.id });
          await updateOrderMain(
            { id: createOrderMain.id },
            { totalPrice: totalValueObject(findOd) },
          );
          res.json(doc);
        }
      }
    } else if (data.flashsaleId) {
      const findFlashSale = await findSale({ id: data.flashsaleId });
      if (!findFlashSale) {
        next(err.notFound());
      } else if (findFlashSale.status === STATUS.inactive) {
        next(err.notAvailable());
      } else {
        data.orderId = findBeforeCreate.id;
        data.userId = userId.id;
        data.itemId = findFlashSale.itemId;
        data.itemName = findFlashSale.itemName;
        data.itemPrice = findFlashSale.itemNewPrice;
        data.total = data.itemQuantity * data.itemPrice;
        data.itemImg = findFlashSale.itemImg;
        data.categoryId = findFlashSale.categoryId;
        // If applied code
        if (findBeforeCreate.code) {
          const findItemExits = await findOrder({ flashsaleId: data.flashsaleId });
          if (findItemExits === null) {
            const findV = await findVoucher({ code: findBeforeCreate.code });
            const newItem = discountOne(data, findV);
            const doc = await create(newItem);
            const findOd = await findOrders({ orderId: findBeforeCreate.id });
            await updateOrderMain(
              { id: findBeforeCreate.id },
              { totalPrice: totalValueObject(findOd) },
            );
            res.json(doc);
          }
          if (findItemExits !== null) {
            const findV = await findVoucher({ code: findBeforeCreate.code });
            data.itemQuantity = findItemExits.itemQuantity + data.itemQuantity;
            const newItem = discountOne(data, findV);
            await updateOrder(
              { id: findItemExits.id },
              {
                itemQuantity: newItem.itemQuantity,
                total: newItem.total,
                itemDiscount: newItem.itemDiscount,
                itemNewPrice: newItem.itemNewPrice,
              },
            );
            const findOds = await findOrders({ orderId: findBeforeCreate.id });
            await updateOrderMain(
              { id: findBeforeCreate.id },
              { totalPrice: totalValueObject(findOds) },
            );
            res.json(newItem);
          }
        } else {
          const findItemExits = await findOrder({ flashsaleId: data.flashsaleId });
          if (findItemExits.flashsaleId === data.flashsaleId) {
            data.itemQuantity = findItemExits.itemQuantity + data.itemQuantity;
            await updateOrder({ id: findItemExits.id }, { itemQuantity: data.itemQuantity });
            const findOds = await findOrders({ orderId: findBeforeCreate.id });
            await updateOrderMain(
              { id: findBeforeCreate.id },
              { totalPrice: totalValueObject(findOds) },
            );
            res.json(findOds);
          } else {
            const doc = await create(data);
            const findOds = await findOrders({ orderId: findBeforeCreate.id });
            await updateOrderMain(
              { id: findBeforeCreate.id },
              { totalPrice: totalValueObject(findOds) },
            );
            res.json(doc);
          }
        }
      }
    } else if (data.itemId) {
      const findExistItem = await findItem({ id: data.itemId });
      if (!findExistItem) {
        next(err.notFound());
      } else if (findExistItem.categoryStatus === STATUS.inactive) {
        next(err.notAvailable());
      } else {
        data.orderId = findBeforeCreate.id;
        data.userId = userId.id;
        data.itemId = findExistItem.id;
        data.itemName = findExistItem.name;
        data.itemPrice = findExistItem.sellingPrice;
        data.total = data.itemQuantity * data.itemPrice;
        data.itemImg = findExistItem.mainimg;
        data.categoryId = findExistItem.categoryId;
        if (findBeforeCreate.code) {
          const findV = await findVoucher({ code: findBeforeCreate.code });
          const newItem = discountOne(data, findV);
          const doc = await create(newItem);
          const findOd = await findOrders({ orderId: findBeforeCreate.id });
          await updateOrderMain(
            { id: findBeforeCreate.id },
            { totalPrice: totalValueObject(findOd) },
          );
          res.json(doc);
        } else {
          const doc = await create(data);
          const findOd = await findOrders({ orderId: findBeforeCreate.id });
          await updateOrderMain(
            { id: findBeforeCreate.id },
            { totalPrice: totalValueObject(findOd) },
          );
          res.json(doc);
        }
      }
    }
  }
}
async function orderApplyVoucher(req, res, next) {
  const userId = req.user;
  const { code } = req.body;
  const findOrderMain = await findMain({ userId: userId.id }, { status: STATUS.awaitpurchase });
  if (!findOrderMain) {
    next(err.notFound());
  } else {
    const findV = await findVoucher({ code });
    if (findV == null) {
      next(err.notFound());
    } else if (findV.status === STATUS.inactive || findV.status === STATUS.expired) {
      next(err.notAvailable());
    } else {
      const apply = await updateOrderMain({ id: findOrderMain.id }, { code });
      if (apply[0] === 1) {
        const findOd = await findOrders({ orderId: findOrderMain.id });
        const toJson = JSON.parse(JSON.stringify(findOd));
        if (findV.categoryId && findV.itemId === null) {
          const update = await applyCate(toJson, findV);
          await updateOrderMain({ id: findOrderMain.id }, { totalPrice: totalValueObject(update) });
          res.json(update);
        }
        if (findV.categoryId === null && findV.itemId) {
          const update = await applyId(toJson, findV);
          await updateOrderMain({ id: findOrderMain.id }, { totalPrice: totalValueObject(update) });
          res.json(update);
        }
        if (findV.categoryId && findV.itemId) {
          const update = await applyIdnCate(toJson, findV);
          await updateOrderMain({ id: findOrderMain.id }, { totalPrice: totalValueObject(update) });
          res.json(update);
        }
        if (findV.categoryId === null && findV.itemId === null) {
          const update = await applyAll(toJson, findV);
          await updateOrderMain({ id: findOrderMain.id }, { totalPrice: totalValueObject(update) });
          res.json(update);
        }
      }
    }
  }
}
async function deleteOneOrder(req, res, next) {
  const { id } = req.body;
  const validate = joiId.validate({ id });
  if (validate.error) {
    validate.error.code = HTTP.StatusCodes.BAD_REQUEST;
    next(validate.error);
  } else {
    const doc = await deleteOrder({ id });
    if (doc === 1) {
      res.status(HTTP.StatusCodes.OK).json({ message: 'DELETED!' });
    } else {
      next(err.notFound());
    }
  }
}
async function completeOrder(req, res) {
  const userId = req.user;
  // const updateMain = await updateOrderMain({ userId: userId.id }, { status: STATUS.purchased });
  const findOrderMain = await findMain({ userId: userId.id }, { status: STATUS.awaitpurchase });
  const findOd = await findOrders({ orderId: findOrderMain.id });
  const updateQuantity = await updateQ(findOd);
  res.json(updateQuantity);
}
module.exports = {
  all,
  createOrder,
  orderApplyVoucher,
  deleteOneOrder,
  completeOrder,
};
