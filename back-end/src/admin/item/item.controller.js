/* eslint-disable object-curly-newline */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
const HTTP = require('http-status-codes');
const fs = require('fs');
const { find, create, findOne, updateOne, deleteOne, findOneCate } = require('./item.services');
const { joiCreate, joiId, joiEdit } = require('./item.validation');
const { randomNum } = require('../../../functions/strings');
const Error = require('../../../errors/errors');

const err = new Error();

async function all(req, res) {
  let { page } = req.query;
  if (!page) {
    page = 1;
  }
  const doc = await find(page);
  res.json(doc);
}
async function createItem(req, res, next) {
  const { files } = req;
  const data = req.body;
  const mainimg = files.mainimg[0];
  data.mainimg = mainimg;
  data.detailimgs = files.imgs;
  data.barcode = randomNum(12);
  const validate = joiCreate.validate(data);
  if (validate.error) {
    validate.error.code = HTTP.StatusCodes.BAD_REQUEST;
    return next(validate.error);
  }
  const doc = await findOneCate({ id: data.categoryId });
  if (doc.original) {
    next(err.duplicateDB(doc.original.detail));
  }
  if (doc.code) {
    next(doc);
  }
  if (doc.id) {
    data.categoryStatus = doc.status;
    data.categoryName = doc.category;
    const doc1 = await create(data);
    res.status(HTTP.StatusCodes.CREATED).json(doc1);
  }
}
async function itemDetails(req, res, next) {
  const { params } = req;
  const validate = joiId.validate(params);
  if (validate.error) {
    validate.error.code = HTTP.StatusCodes.BAD_REQUEST;
    next(validate.error);
  } else {
    const doc = await findOne(params);
    if (doc.message) {
      next(doc);
    }
    if (doc.id) {
      res.status(HTTP.StatusCodes.OK).json(doc);
    }
  }
}
async function itemEdit(req, res, next) {
  const data = req.body;
  const validate = joiEdit.validate(data);
  if (validate.error) {
    validate.error.code = HTTP.StatusCodes.BAD_REQUEST;
    next(validate.error);
  } else {
    const doc = await findOne({ id: data.id });
    if (doc.message) {
      next(doc);
    }
    if (doc.id) {
      const { id, ...newData } = data;
      const edit = await updateOne({ id: data.id }, newData);
      if (edit[0] === 1) {
        res.status(HTTP.StatusCodes.OK).json({ message: 'Updated.' });
      }
      if (edit[0] === 0) {
        res.status(HTTP.StatusCodes.BAD_REQUEST).json('Failed.');
      }
    }
  }
}
async function itemEditImgs(req, res, next) {
  const { id, imgsCode } = req.body;
  const validate = joiId.validate({ id });
  if (validate.error) {
    validate.error.code = HTTP.StatusCodes.BAD_REQUEST;
    next(validate.error);
  }
  const doc = await findOne({ id });
  if (doc.message) {
    next(doc);
  }
  if (doc.id) {
    if (req.files.mainimg && req.files.imgs) {
      if (typeof imgsCode === 'string') {
        const arr = doc.detailimgs;
        const mainImg = req.files.mainimg[0];
        const imgs = req.files.imgs[0];
        fs.unlinkSync(doc.mainimg.path, (error) => {
          if (error) {
            next(error);
          }
        });
        const newArr = arr.map((img) => {
          if (img.size == imgsCode) {
            fs.unlinkSync(img.path, (error) => {
              if (error) {
                next(err.notFound());
              }
            });
            img = imgs;
          }
          return img;
        });
        const updateImg = await updateOne({ id }, { detailimgs: newArr, mainimg: mainImg });
        if (updateImg[0] === 1) {
          res.json(newArr);
        }
      }
      if (typeof imgsCode === 'object') {
        const arr = doc.detailimgs;
        const mainImg = req.files.mainimg[0];
        const { imgs } = req.files;
        fs.unlinkSync(doc.mainimg.path, (error) => {
          if (error) {
            next(error);
          }
        });
        const newArr = arr.map((img) => {
          for (let i = 0; i < imgsCode.length; i++) {
            if (img.size == imgsCode[i]) {
              fs.unlinkSync(img.path, (error) => {
                if (error) {
                  next(err.notFound());
                }
              });
              img = imgs[i];
            }
          }
          return img;
        });
        const updateImg = await updateOne({ id }, { detailimgs: newArr, mainimg: mainImg });
        if (updateImg[0] === 1) {
          res.json(newArr);
        }
      }
    }
    if (req.files.mainimg && !req.files.imgs) {
      const img = req.files.mainimg[0];
      const updateMainImg = await updateOne({ id }, { mainimg: img });
      if (updateMainImg[0] == 1) {
        fs.unlinkSync(doc.mainimg.path, (error) => {
          if (error) {
            next(error);
          }
        });
        res.status(HTTP.StatusCodes.OK).json('Updated');
      }
    }
    if (req.files.imgs && !req.files.mainimg) {
      if (typeof imgsCode === 'string') {
        const arr = doc.detailimgs;
        const newImg = req.files.imgs[0];
        const newArr = arr.map((img) => {
          if (img.size == imgsCode) {
            fs.unlinkSync(img.path, (error) => {
              if (error) {
                next(err.notFound());
              }
            });
            img = newImg;
          }
          return img;
        });
        const updateImg = await updateOne({ id }, { detailimgs: newArr });
        if (updateImg[0] === 1) {
          res.json(newArr);
        }
      }
      if (typeof imgsCode === 'object') {
        const arr = doc.detailimgs;
        const newImg = req.files.imgs;
        const newArr = arr.map((img) => {
          for (let i = 0; i < imgsCode.length; i++) {
            if (img.size == imgsCode[i]) {
              fs.unlinkSync(img.path, (error) => {
                if (error) {
                  next(err.notFound());
                }
              });
              img = newImg[i];
            }
          }
          return img;
        });
        const updateImg = await updateOne({ id }, { detailimgs: newArr });
        if (updateImg[0] === 1) {
          res.json(newArr);
        }
      }
    }
  }
}
async function itemDelete(req, res, next) {
  const { id } = req.body;
  const doc = await deleteOne({ id });
  if (doc === 1) {
    res.status(HTTP.StatusCodes.OK).json({ message: 'Deleted' });
  }
  if (doc === 0) {
    next(err.notFound());
  }
}
module.exports = {
  all,
  createItem,
  itemDetails,
  itemEdit,
  itemEditImgs,
  itemDelete,
};
