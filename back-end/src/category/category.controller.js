/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
const HTTP = require('http-status-codes');
const fs = require('fs');
const {
  find,
  create,
  findItems,
  findOne,
  updateOne,
  deleteOne,
  updateBulkItems,
} = require('./category.services');
const {
  joiCreate,
  joiId,
  joiEdit,
  joiCategory,
} = require('./category.validation');
const Error = require('../../errors/errors');
const { STATUS } = require('../../configs/enum');

const err = new Error();

async function all(req, res) {
  let { page } = req.query;
  if (!page) {
    page = 1;
  }
  const doc = await find(page);
  res.json(doc);
}
async function categoryCreate(req, res, next) {
  const { file } = req;
  const data = req.body;
  if (!file) {
    res
      .status(HTTP.StatusCodes.BAD_REQUEST)
      .json({ message: 'File is required' });
  }
  const validate = joiCreate.validate(data);
  if (validate.error) {
    validate.error.code = HTTP.StatusCodes.BAD_REQUEST;
    next(validate.error);
  } else {
    data.banner = file;
    const doc = await create(data);
    if (doc.original) {
      next(err.duplicateDB(doc.original.detail));
    }
    if (doc.id) {
      res.status(HTTP.StatusCodes.CREATED).json(doc);
    }
  }
}
async function categoryItems(req, res, next) {
  const { params } = req;
  const validate = joiCategory.validate(params);
  if (validate.error) {
    validate.error.code = HTTP.StatusCodes.BAD_REQUEST;
    next(validate.error);
  } else {
    const id = params.categoryId;
    const doc = await findOne({ id });
    if (doc.code) {
      next(doc);
    }
    if (doc.status == STATUS.inactive) {
      next(err.notAvailable());
    } else {
      const doc1 = await findItems(params);
      res.json(doc1);
    }
  }
}
async function categoryEdit(req, res, next) {
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
        await updateBulkItems(
          { categoryId: data.id },
          { categoryStatus: newData.status },
        );
        res.status(HTTP.StatusCodes.OK).json({ message: 'Updated.' });
      }
      if (edit[0] === 0) {
        res.status(HTTP.StatusCodes.BAD_REQUEST).json('Failed.');
      }
    }
  }
}
async function categoryEditImg(req, res, next) {
  const { id } = req.body;
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
    const img = req.file;
    const bannerImg = await updateOne({ id }, { banner: img });
    if (bannerImg[0] === 1) {
      fs.unlinkSync(doc.banner.path, (error) => {
        if (error) {
          next(error);
        }
      });
      res.status(HTTP.StatusCodes.OK).json('Updated');
    }
  }
}
async function categoryDelete(req, res, next) {
  const { id } = req.body;
  const doc = await deleteOne({ id });
  if (doc.original) {
    next(err.duplicateDB(doc.original.detail));
  }
  if (doc === 1) {
    res.status(HTTP.StatusCodes.OK).json({ message: 'Deleted' });
  }
  if (doc === 0) {
    next(err.notFound());
  }
}
module.exports = {
  all,
  categoryCreate,
  categoryItems,
  categoryEditImg,
  categoryEdit,
  categoryDelete,
};
