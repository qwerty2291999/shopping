const HTTP = require('http-status-codes');

class Errs extends Error {
  constructor(name, message, stack, code) {
    super(name, message, stack);
    this.code = code;
  }

  duplicateDB(data) {
    this.code = HTTP.StatusCodes.CONFLICT;
    this.message = `${data}`;
    this.name = 'Data Error';
    return this;
  }

  usernamePassword() {
    this.code = HTTP.StatusCodes.NOT_FOUND;
    this.message = 'Wrong username or email or password';
    this.name = 'Data Error';
    return this;
  }

  notFound() {
    this.code = HTTP.StatusCodes.NOT_FOUND;
    this.message = 'Not Found';
    this.name = 'Data Error';
    return this;
  }

  notAuthen() {
    this.code = HTTP.StatusCodes.UNAUTHORIZED;
    this.message = 'User is not authenticated';
    this.name = 'User Error';
    return this;
  }

  notAvailable() {
    this.code = HTTP.StatusCodes.FORBIDDEN;
    this.message = 'Not Available';
    this.name = 'Error';
    return this;
  }

  onSale() {
    this.code = HTTP.StatusCodes.CONFLICT;
    this.message = 'This item onsale';
    this.name = 'Error';
    return this;
  }

  higherThanMax(data, doc) {
    this.code = HTTP.StatusCodes.BAD_REQUEST;
    this.message = `Flashsale quantity : ${data.quantity} > item ${doc.id} quantity : ${doc.quantity}`;
    this.name = 'Error';
    return this;
  }

  saleMax(saleQ, Q) {
    this.code = HTTP.StatusCodes.BAD_REQUEST;
    this.message = `Your sale order quantity : ${Q} > sale ${saleQ.id} quantity : ${saleQ.quantity}`;
    this.name = 'Error';
    return this;
  }

  itemMax(itemQ, Q) {
    this.code = HTTP.StatusCodes.BAD_REQUEST;
    this.message = `Your item order quantity : ${Q} > item ${itemQ.id} quantity : ${itemQ.quantity}`;
    this.name = 'Error';
    return this;
  }

  noVoucherLeft(code) {
    this.code = HTTP.StatusCodes.BAD_REQUEST;
    this.message = `No voucher : ${code} left`;
    this.name = 'Error';
    return this;
  }

  verify() {
    this.code = HTTP.StatusCodes.FORBIDDEN;
    this.message = 'You need to verify account first';
    this.name = 'Error';
    return this;
  }

  wrongCode() {
    this.code = HTTP.StatusCodes.BAD_REQUEST;
    this.message = 'Wrong Code';
    this.name = 'Error';
    return this;
  }
}
module.exports = Errs;
