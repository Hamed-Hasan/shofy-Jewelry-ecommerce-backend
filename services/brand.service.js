const ApiError = require('../errors/api-error');
const Brand = require('../model/Brand');

// addBrandService
module.exports.addBrandService = async (data) => {
  const brand = await Brand.create(data);
  return brand
}

// create all Brands service
exports.addAllBrandService = async (data) => {
  await Brand.deleteMany()
  const brands = await Brand.insertMany(data);
  return brands;
}


// get all Brands service
exports.getBrandsService = async () => {
  const brands = await Brand.find({status:'active'}).populate('products');
  return brands;
}

// get all Brands service
exports.deleteBrandsService = async (id) => {
  const brands = await Brand.findByIdAndDelete(id);
  return brands;
}

// update category
exports.updateBrandService = async (id,payload) => {
  const isExist = await Brand.findOne({ _id:id })

  if (!isExist) {
    throw new ApiError(404, 'Brand not found !')
  }

  const result = await Brand.findOneAndUpdate({ _id:id }, payload, {
    new: true,
  })
  return result
}

// get single category
exports.getSingleBrandService = async (id) => {
  const result = await Brand.findById(id);
  return result;
}