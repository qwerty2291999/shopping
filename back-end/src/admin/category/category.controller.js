/* eslint-disable object-curly-newline */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
const HTTP = require('http-status-codes');
const {
  find,
  create,
  findOne,
  updateOne,
  deleteOne,
  updateBulkItems,
  updateBanner,
  updateIcon,
  updateAllImg,
} = require('./category.services');
const { joiCreate, joiId, joiEdit, joiCategory } = require('./category.validation');
const Error = require('../../../errors/errors');
const { STATUS } = require('../../../configs/enum');

const err = new Error();

async function all(req, res) {
  const doc = await find();
  res.json(doc);
}
async function categoryCreate(req, res, next) {
  const { files } = req;
  const data = req.body;
  if (!files) {
    res.status(HTTP.StatusCodes.BAD_REQUEST).json({ message: 'File is required' });
  }
  const validate = joiCreate.validate(data);
  if (validate.error) {
    validate.error.code = HTTP.StatusCodes.BAD_REQUEST;
    next(validate.error);
  } else {
    const banner = files.banner[0];
    const icon = files.icon[0];
    data.banner = banner;
    data.icon = icon;
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
    if (doc.id) {
      res.json(doc);
    } else if (doc.code) {
      return next(doc);
    } else if (doc.status == STATUS.inactive) {
      next(err.notAvailable());
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
        await updateBulkItems({ categoryId: data.id }, { categoryStatus: newData.status });
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
    const imgs = req.files;
    if (imgs.banner && !imgs.icon) {
      const result = await updateBanner(doc, imgs.banner[0]);
      if (result[0] == 1) {
        res.status(HTTP.StatusCodes.OK).json({ message: 'OK' });
      } else {
        res.status(HTTP.StatusCodes.BAD_REQUEST).json({ message: 'Failed' });
      }
    }
    if (!imgs.banner && imgs.icon) {
      const result = await updateIcon(doc, imgs.icon[0]);
      if (result[0] == 1) {
        res.status(HTTP.StatusCodes.OK).json({ message: 'OK' });
      } else {
        res.status(HTTP.StatusCodes.BAD_REQUEST).json({ message: 'Failed' });
      }
    }
    if (imgs.banner && imgs.icon) {
      const result = await updateAllImg(doc, { icon: imgs.icon[0], banner: imgs.banner[0] });
      if (result[0] == 1) {
        res.status(HTTP.StatusCodes.OK).json({ message: 'OK' });
      } else {
        res.status(HTTP.StatusCodes.BAD_REQUEST).json({ message: 'Failed' });
      }
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
