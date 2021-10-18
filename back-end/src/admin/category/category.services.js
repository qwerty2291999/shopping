/* eslint-disable consistent-return */
const fs = require('fs');
const CategoryData = require('./category.data');
const Error = require('../../../errors/errors');

const err = new Error();

async function find() {
  const doc = await CategoryData.find();
  return doc;
}
async function updateBanner(doc, img) {
  const bannerImg = await CategoryData.updateOne({ id: doc.id }, { banner: img });
  if (bannerImg[0] === 1) {
    fs.unlinkSync(doc.banner.path, (error) => {
      if (error) {
        return error;
      }
    });
  }
  return bannerImg;
}
async function updateIcon(doc, img) {
  const iconImg = await CategoryData.updateOne({ id: doc.id }, { icon: img });
  if (iconImg[0] === 1) {
    fs.unlinkSync(doc.icon.path, (error) => {
      if (error) {
        return error;
      }
    });
  }
  return iconImg;
}
async function updateAllImg(doc, img) {
  const update = await CategoryData.updateOne({ id: doc.id }, img);
  if (update[0] === 1) {
    fs.unlinkSync(doc.banner.path, (error) => {
      if (error) {
        return error;
      }
    });
    fs.unlinkSync(doc.icon.path, (error) => {
      if (error) {
        return error;
      }
    });
  }
  return update;
}
async function create(any) {
  const doc = await CategoryData.create(any);
  return doc;
}
async function findOne(any) {
  const doc = await CategoryData.findOne(any);
  if (doc) {
    return doc.toJSON();
  }
  return err.notFound();
}
async function findItems(any) {
  const doc = await CategoryData.findItems(any);
  if (doc[0]) {
    return doc;
  }
  return err.notFound();
}
async function updateOne(id, any) {
  const doc = await CategoryData.updateOne(id, any);
  return doc;
}
async function updateBulkItems(id, any) {
  const doc = await CategoryData.updateBulkItems(id, any);
  return doc;
}
async function deleteOne(id) {
  const doc = await CategoryData.deleteOne(id);
  return doc;
}
module.exports = {
  find,
  create,
  findOne,
  updateOne,
  deleteOne,
  findItems,
  updateBulkItems,
  updateBanner,
  updateIcon,
  updateAllImg,
};
