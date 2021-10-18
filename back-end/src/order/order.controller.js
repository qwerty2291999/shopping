/* eslint-disable no-await-in-loop */
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
  findUser,
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
  updateQSale,
  updateQItem,
  findItemAttribute,
  removeCode,
  updateQVoucher,
} = require('./order.services');
const { joiCreate, joiId } = require('./order.validation');
const Error = require('../../errors/errors');
const { STATUS } = require('../../configs/enum');
const { totalValueObject, discountOne } = require('../../functions/numbers');
const { filterOne } = require('../../functions/strings');

const err = new Error();

async function all(req, res, next) {
  const userId = req.user;
  const findOrderMain = await findMain({ userId: userId.id }, { status: STATUS.awaitpurchase });
  if (!findOrderMain) {
    next(err.notFound());
  } else {
    const findO = await findOrders({ orderId: findOrderMain.id });
    res.json(findO);
  }
}
async function createOrder(req, res, next) {
  const userId = req.user;
  const data = req.body;
  const validate = joiCreate.validate(data);
  if (validate.error) {
    validate.error.code = HTTP.StatusCodes.BAD_REQUEST;
    return next(validate.error);
  }
  const findBeforeCreate = await findMain({ userId: userId.id }, { status: STATUS.awaitpurchase });
  // if no main order
  if (findBeforeCreate == null) {
    // create Main
    const userInfo = await findUser({ id: userId.id });
    const createOrderMain = await createMain({
      userId: userInfo.id,
      userPhoneNumber: userInfo.phoneNumber,
      userAddress: userInfo.address,
    });
    // If Flashsale ID
    if (data.flashsaleId) {
      // Check Flashsale exist and status
      const checkSaleStatus = await findSale({ id: data.flashsaleId });
      if (checkSaleStatus == null) {
        return next(err.notFound());
      }
      if (checkSaleStatus.status === STATUS.inactive) {
        return next(err.notAvailable());
      }
      // Find Item Attribute before add in order
      const findItemAtt = await findItemAttribute({ itemId: checkSaleStatus.itemId });
      if (!findItemAtt[0]) {
        return next({ code: HTTP.StatusCodes.BAD_REQUEST, message: 'No attribute found.' });
      }
      const attribute = filterOne(data.itemAttributeId, findItemAtt);
      if (!attribute) {
        return next({ code: HTTP.StatusCodes.BAD_REQUEST, message: 'No item attribute found.' });
      }
      // Assign Data
      data.orderId = createOrderMain.id;
      data.userId = userInfo.id;
      data.itemId = checkSaleStatus.itemId;
      data.itemName = checkSaleStatus.itemName;
      data.itemPrice = checkSaleStatus.itemNewPrice;
      data.total = data.itemQuantity * data.itemPrice;
      data.itemImg = checkSaleStatus.itemImg;
      data.categoryId = checkSaleStatus.categoryId;
      data.attributeId = attribute.id;
      data.attributeColor = attribute.color;
      data.attributeSize = attribute.size;
      // Start to create Order
      const doc = await create(data);
      const findOd = await findOrders({ orderId: createOrderMain.id });
      await updateOrderMain({ id: createOrderMain.id }, { totalPrice: totalValueObject(findOd) });
      return res.json(doc);
    }
    // if Item ID
    if (data.itemId) {
      // Check Flashsale exist and status
      const checkItemStatus = await findItem({ id: data.itemId });
      if (checkItemStatus == null) {
        return next(err.notFound());
      }
      if (checkItemStatus.status === STATUS.inactive) {
        return next(err.notAvailable());
      }
      // Find Item Attribute before add in order
      const findItemAtt = await findItemAttribute({ itemId: checkItemStatus.id });
      if (!findItemAtt[0]) {
        return next({ code: HTTP.StatusCodes.BAD_REQUEST, message: 'No attribute found.' });
      }
      const attribute = filterOne(data.itemAttributeId, findItemAtt);
      if (!attribute) {
        return next({ code: HTTP.StatusCodes.BAD_REQUEST, message: 'No item attribute found.' });
      }
      // Assign Data
      data.orderId = createOrderMain.id;
      data.userId = userId.id;
      data.itemId = checkItemStatus.id;
      data.itemName = checkItemStatus.name;
      data.itemPrice = checkItemStatus.sellingPrice;
      data.total = data.itemQuantity * data.itemPrice;
      data.itemImg = checkItemStatus.mainimg;
      data.categoryId = checkItemStatus.categoryId;
      data.attributeId = attribute.id;
      data.attributeColor = attribute.color;
      data.attributeSize = attribute.size;
      // Start to create Order
      const doc = await create(data);
      const findOd = await findOrders({ orderId: createOrderMain.id });
      await updateOrderMain({ id: createOrderMain.id }, { totalPrice: totalValueObject(findOd) });
      return res.json(doc);
    }
  } else if (data.flashsaleId) {
    // Check FlashSale Exists
    const userInfo = await findUser({ id: userId.id });
    const checkFlashSaleExist = await findSale({ id: data.flashsaleId });
    if (!checkFlashSaleExist) {
      return next(err.notFound());
    }
    if (checkFlashSaleExist.status === STATUS.inactive) {
      return next(err.notAvailable());
    }
    // Find Item Attribute before add in order
    const findItemAtt = await findItemAttribute({ itemId: checkFlashSaleExist.itemId });
    if (!findItemAtt[0]) {
      return next({ code: HTTP.StatusCodes.BAD_REQUEST, message: 'No attribute found.' });
    }
    const attribute = filterOne(data.itemAttributeId, findItemAtt);
    if (!attribute) {
      return next({ code: HTTP.StatusCodes.BAD_REQUEST, message: 'No item attribute found.' });
    }
    // Assign Data
    data.orderId = findBeforeCreate.id;
    data.userId = userInfo.id;
    data.itemId = checkFlashSaleExist.itemId;
    data.itemName = checkFlashSaleExist.itemName;
    data.itemPrice = checkFlashSaleExist.itemNewPrice;
    data.total = data.itemQuantity * data.itemPrice;
    data.itemImg = checkFlashSaleExist.itemImg;
    data.categoryId = checkFlashSaleExist.categoryId;
    data.attributeId = attribute.id;
    data.attributeColor = attribute.color;
    data.attributeSize = attribute.size;
    // voucher applied
    if (findBeforeCreate.code) {
      const findItemExits = await findOrder({
        flashsaleId: data.flashsaleId,
        attributeId: data.attributeId,
        itemId: data.itemId,
      });
      if (findItemExits === null) {
        const findV = await findVoucher({ code: findBeforeCreate.code });
        const newItem = discountOne(data, findV);
        const doc = await create(newItem);
        const findOd = await findOrders({ orderId: findBeforeCreate.id });
        await updateOrderMain(
          { id: findBeforeCreate.id },
          { totalPrice: totalValueObject(findOd) },
        );
        return res.json(doc);
      }
      const findV = await findVoucher({ code: findBeforeCreate.code });
      data.itemQuantity = findItemExits.itemQuantity + data.itemQuantity;
      const newItem = discountOne(data, findV);
      await updateOrder(
        { id: findItemExits.id, attributeId: data.attributeId },
        {
          itemQuantity: newItem.itemQuantity,
          total: newItem.total,
          itemDiscount: newItem.itemDiscount,
          itemNewPrice: newItem.itemNewPrice,
        },
      );
      const findOds = await findOrders({ orderId: findBeforeCreate.id });
      await updateOrderMain({ id: findBeforeCreate.id }, { totalPrice: totalValueObject(findOds) });
      return res.json(newItem);
    }
    // no voucher applied
    if (!findBeforeCreate.code) {
      const findItemExits = await findOrder({
        flashsaleId: data.flashsaleId,
        attributeId: data.attributeId,
      });
      if (findItemExits === null) {
        const doc = await create(data);
        const findOd = await findOrders({ orderId: findBeforeCreate.id });
        await updateOrderMain(
          { id: findBeforeCreate.id },
          { totalPrice: totalValueObject(findOd) },
        );
        return res.json(doc);
      }
      data.itemQuantity = findItemExits.itemQuantity + data.itemQuantity;
      await updateOrder(
        { id: findItemExits.id, attributeId: data.attributeId },
        {
          itemQuantity: data.itemQuantity,
          total: data.total,
          itemDiscount: data.itemDiscount,
          itemNewPrice: data.itemNewPrice,
        },
      );
      const findOds = await findOrders({ orderId: findBeforeCreate.id });
      await updateOrderMain({ id: findBeforeCreate.id }, { totalPrice: totalValueObject(findOds) });
      return res.json(data);
    }
  }
  if (data.itemId) {
    // Check FlashSale Exists
    const userInfo = await findUser({ id: userId.id });
    const checkItemExist = await findItem({ id: data.itemId });
    if (!checkItemExist) {
      return next(err.notFound());
    }
    if (checkItemExist.categoryStatus === STATUS.inactive) {
      return next(err.notAvailable());
    }
    // Find Item Attribute before add in order
    const findItemAtt = await findItemAttribute({ itemId: checkItemExist.id });
    if (!findItemAtt[0]) {
      return next({ code: HTTP.StatusCodes.BAD_REQUEST, message: 'No attribute found.' });
    }
    const attribute = filterOne(data.itemAttributeId, findItemAtt);
    if (!attribute) {
      return next({ code: HTTP.StatusCodes.BAD_REQUEST, message: 'No item attribute found.' });
    }
    // Assign Data
    data.orderId = findBeforeCreate.id;
    data.userId = userInfo.id;
    data.itemId = checkItemExist.id;
    data.itemName = checkItemExist.name;
    data.itemPrice = checkItemExist.sellingPrice;
    data.total = data.itemQuantity * data.itemPrice;
    data.itemImg = checkItemExist.mainimg;
    data.categoryId = checkItemExist.categoryId;
    data.attributeId = attribute.id;
    data.attributeColor = attribute.color;
    data.attributeSize = attribute.size;
    // voucher applied
    if (findBeforeCreate.code) {
      const findItemExits = await findOrder({
        itemId: data.itemId,
        flashsaleId: null,
        attributeId: data.attributeId,
      });
      if (findItemExits === null) {
        const findV = await findVoucher({ code: findBeforeCreate.code });
        const newItem = discountOne(data, findV);
        const doc = await create(newItem);
        const findOd = await findOrders({ orderId: findBeforeCreate.id });
        await updateOrderMain(
          { id: findBeforeCreate.id },
          { totalPrice: totalValueObject(findOd) },
        );
        return res.json(doc);
      }
      const findV = await findVoucher({ code: findBeforeCreate.code });
      data.itemQuantity = findItemExits.itemQuantity + data.itemQuantity;
      const newItem = discountOne(data, findV);
      await updateOrder(
        { id: findItemExits.id, attributeId: data.attributeId },
        {
          itemQuantity: newItem.itemQuantity,
          total: newItem.total,
          itemDiscount: newItem.itemDiscount,
          itemNewPrice: newItem.itemNewPrice,
        },
      );
      const findOds = await findOrders({ orderId: findBeforeCreate.id });
      await updateOrderMain({ id: findBeforeCreate.id }, { totalPrice: totalValueObject(findOds) });
      return res.json(newItem);
    }
    if (!findBeforeCreate.code) {
      const findItemExits = await findOrder({
        itemId: data.itemId,
        flashsaleId: null,
        attributeId: data.attributeId,
      });
      if (findItemExits === null) {
        const doc = await create(data);
        const findOd = await findOrders({ orderId: findBeforeCreate.id });
        await updateOrderMain(
          { id: findBeforeCreate.id },
          { totalPrice: totalValueObject(findOd) },
        );
        return res.json(doc);
      }
      data.itemQuantity = findItemExits.itemQuantity + data.itemQuantity;
      await updateOrder(
        { id: findItemExits.id, attributeId: data.attributeId, flashsaleId: null },
        {
          itemQuantity: data.itemQuantity,
          total: data.itemQuantity * data.itemPrice,
          itemDiscount: data.itemDiscount,
          itemNewPrice: data.itemNewPrice,
        },
      );
      const findOds = await findOrders({ orderId: findBeforeCreate.id });
      await updateOrderMain({ id: findBeforeCreate.id }, { totalPrice: totalValueObject(findOds) });
      return res.json(data);
    }
  }
}
async function orderApplyVoucher(req, res, next) {
  const userId = req.user;
  const { code } = req.body;
  const findOrderMain = await findMain({ userId: userId.id }, { status: STATUS.awaitpurchase });
  if (!findOrderMain) {
    return next(err.notFound());
  }
  const findV = await findVoucher({ code });
  if (findV == null) {
    return next(err.notFound());
  }
  if (findV.status === STATUS.inactive || findV.status === STATUS.expired) {
    return next(err.notAvailable());
  }
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
async function orderRemoveVoucher(req, res, next) {
  const userId = req.user;
  const findOrderMain = await findMain({ userId: userId.id }, { status: STATUS.awaitpurchase });
  if (!findOrderMain) {
    return next(err.notFound());
  }

  const findOd = await findOrders({ orderId: findOrderMain.id });
  const toJson = JSON.parse(JSON.stringify(findOd));
  const update = await removeCode(toJson);
  await updateOrderMain(
    { id: findOrderMain.id },
    { totalPrice: totalValueObject(update), code: null },
  );
  res.json(update);
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
async function completeOrder(req, res, next) {
  const userId = req.user;
  const findOrderMain = await findMain({ userId: userId.id }, { status: STATUS.awaitpurchase });
  const findOds = await findOrders({ orderId: findOrderMain.id });
  const toJson = JSON.parse(JSON.stringify(findOds));
  if (findOrderMain.code) {
    const updateVQ = await updateQVoucher({ code: findOrderMain.code });
    if (updateVQ.message) {
      return next(updateVQ);
    }
  }
  for (let i = 0; i < toJson.length; i++) {
    if (toJson[i].flashsaleId) {
      const e = await updateQSale({ id: toJson[i].flashsaleId }, toJson[i].itemQuantity);
      if (e.message) {
        next(e);
        break;
      }
    }
    if (toJson[i].flashsaleId == null) {
      const a = await updateQItem({ id: toJson[i].itemId }, toJson[i].itemQuantity);
      if (a.code) {
        next(a);
        break;
      }
    }
  }
  const updateMain = await updateOrderMain({ userId: userId.id }, { status: STATUS.purchased });
  if (updateMain[0] === 1) {
    res.json('Purchased!');
  }
}
module.exports = {
  all,
  createOrder,
  orderApplyVoucher,
  deleteOneOrder,
  completeOrder,
  orderRemoveVoucher,
};
