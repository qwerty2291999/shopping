/* eslint-disable no-param-reassign */
function totalValueObject(arr) {
  const newArr = arr.map((item) => item.total);
  const total = newArr.reduce((a, b) => a + b, 0);
  return total;
}
function applyVoucherCate(arr, voucher) {
  if (voucher.discount < 100) {
    const newArr = arr.map((item) => {
      if (item.categoryId === voucher.categoryId) {
        item.itemDiscount = voucher.discount;
        item.itemNewPrice = item.itemPrice - (voucher.discount / 100) * item.itemPrice;
        item.total = item.itemNewPrice * item.itemQuantity;
      } else {
        item.itemDiscount = 0;
        item.itemNewPrice = 0;
        item.total = item.itemPrice * item.itemQuantity;
      }
      return item;
    });
    return newArr;
  }
  const newArr = arr.map((item) => {
    if (item.categoryId === voucher.categoryId) {
      item.itemDiscount = voucher.discount;
      item.itemNewPrice = item.itemPrice - voucher.discount;
      item.total = item.newPrice * item.quantity;
    } else {
      item.itemDiscount = 0;
      item.itemNewPrice = 0;
      item.total = item.itemPrice * item.itemQuantity;
    }
    return item;
  });
  return newArr;
}
function applyVoucherId(arr, voucher) {
  if (voucher.discount < 100) {
    const newArr = arr.map((item) => {
      if (item.itemId === voucher.itemId) {
        item.itemDiscount = voucher.discount;
        item.itemNewPrice = item.itemPrice - (voucher.discount / 100) * item.itemPrice;
        item.total = item.itemNewPrice * item.itemQuantity;
      } else {
        item.itemDiscount = 0;
        item.itemNewPrice = 0;
        item.total = item.itemPrice * item.itemQuantity;
      }
      return item;
    });
    return newArr;
  }
  const newArr = arr.map((item) => {
    if (item.categoryId === voucher.categoryId) {
      item.itemDiscount = voucher.discount;
      item.itemNewPrice = item.itemPrice - voucher.discount;
      item.total = item.newPrice * item.quantity;
    } else {
      item.itemDiscount = 0;
      item.itemNewPrice = 0;
      item.total = item.itemPrice * item.itemQuantity;
    }
    return item;
  });
  return newArr;
}
function applyVoucherIdnCate(arr, voucher) {
  if (voucher.discount < 100) {
    const newArr = arr.map((item) => {
      if (item.itemId === voucher.itemId && item.categoryId === voucher.categoryId) {
        item.itemDiscount = voucher.discount;
        item.itemNewPrice = item.itemPrice - (voucher.discount / 100) * item.itemPrice;
        item.total = item.itemNewPrice * item.itemQuantity;
      } else {
        item.itemDiscount = 0;
        item.itemNewPrice = 0;
        item.total = item.itemPrice * item.itemQuantity;
      }
      return item;
    });
    return newArr;
  }
  const newArr = arr.map((item) => {
    if (item.itemId === voucher.itemId && item.categoryId === voucher.categoryId) {
      item.itemDiscount = voucher.discount;
      item.itemNewPrice = item.itemPrice - voucher.discount;
      item.total = item.newPrice * item.quantity;
    } else {
      item.itemDiscount = 0;
      item.itemNewPrice = 0;
      item.total = item.itemPrice * item.itemQuantity;
    }
    return item;
  });
  return newArr;
}
function applyVoucher(arr, voucher) {
  if (voucher.discount < 100) {
    const newArr = arr.map((item) => {
      item.itemDiscount = voucher.discount;
      item.itemNewPrice = item.itemPrice - (voucher.discount / 100) * item.itemPrice;
      item.total = item.itemNewPrice * item.itemQuantity;
      return item;
    });
    return newArr;
  }
  const newArr = arr.map((item) => {
    item.itemDiscount = voucher.discount;
    item.itemNewPrice = item.itemPrice - voucher.discount;
    item.total = item.newPrice * item.quantity;
    return item;
  });
  return newArr;
}
function removeVoucher(arr) {
  const newArr = arr.map((item) => {
    item.itemDiscount = 0;
    item.itemNewPrice = 0;
    item.total = item.itemPrice * item.itemQuantity;
    return item;
  });
  return newArr;
}
function discountOne(item, voucher) {
  if (voucher.discount < 100) {
    if (item.categoryId === voucher.categoryId) {
      item.itemDiscount = voucher.discount;
      item.itemNewPrice = item.itemPrice - (voucher.discount / 100) * item.itemPrice;
      item.total = item.itemNewPrice * item.itemQuantity;
    }
    if (item.itemId === voucher.itemId) {
      item.itemDiscount = voucher.discount;
      item.itemNewPrice = item.itemPrice - (voucher.discount / 100) * item.itemPrice;
      item.total = item.itemNewPrice * item.itemQuantity;
    }
    if (item.itemId === voucher.itemId && item.categoryId === voucher.categoryId) {
      item.itemDiscount = voucher.discount;
      item.itemNewPrice = item.itemPrice - (voucher.discount / 100) * item.itemPrice;
      item.total = item.itemNewPrice * item.itemQuantity;
    }
    if (item.itemId !== voucher.itemId && item.categoryId !== voucher.categoryId) {
      item.total = item.itemPrice * item.itemQuantity;
    }
    if (voucher.itemId == null && voucher.categoryId == null) {
      item.itemDiscount = voucher.discount;
      item.itemNewPrice = item.itemPrice - (voucher.discount / 100) * item.itemPrice;
      item.total = item.itemNewPrice * item.itemQuantity;
    }
    return item;
  }
  if (item.categoryId === voucher.categoryId) {
    item.itemDiscount = voucher.discount;
    item.itemNewPrice = item.itemPrice - voucher.discount;
    item.total = item.newPrice * item.quantity;
  }
  if (item.itemId === voucher.itemId) {
    item.itemDiscount = voucher.discount;
    item.itemNewPrice = item.itemPrice - voucher.discount;
    item.total = item.newPrice * item.quantity;
  }
  if (item.itemId === voucher.itemId && item.categoryId === voucher.categoryId) {
    item.itemDiscount = voucher.discount;
    item.itemNewPrice = item.itemPrice - voucher.discount;
    item.total = item.newPrice * item.quantity;
  }
  if (item.itemId !== voucher.itemId && item.categoryId !== voucher.categoryId) {
    item.total = item.itemPrice * item.itemQuantity;
  }
  if (voucher.itemId == null && voucher.categoryId == null) {
    item.total = item.itemPrice * item.itemQuantity;
  }
  return item;
}
function randomNum() {
  let result = Math.floor(Math.random() * 9999);
  if (result < 1000) {
    result += 1000;
  }
  return result;
}
module.exports = {
  totalValueObject,
  applyVoucherCate,
  applyVoucherId,
  applyVoucherIdnCate,
  applyVoucher,
  discountOne,
  removeVoucher,
  randomNum,
};
