const categoryServices = require("../services/category.service");


// add category
exports.addCategory = async (req,res,next) => {
  try {
    const result = await categoryServices.createCategoryService(req.body);
    res.status(200).json({
      status: "success",
      message: "Category created successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error)
    next(error)
  }
}

// add all category
exports.addAllCategory = async (req,res,next) => {
  try {
    const result = await categoryServices.addAllCategoryService(req.body);
    res.json({
      message:'Category added successfully',
      result,
    })
  } catch (error) {
    next(error)
  }
}

// add all category
exports.getShowCategory = async (req,res,next) => {
  try {
    const result = await categoryServices.getShowCategoryServices();
    res.status(200).json({
      success:true,
      result,
    })
  } catch (error) {
    next(error)
  }
}

// add all category
exports.getAllCategory = async (req,res,next) => {
  try {
    const result = await categoryServices.getAllCategoryServices();
    res.status(200).json({
      success:true,
      result,
    })
  } catch (error) {
    next(error)
  }
}


// add all category
exports.getProductTypeCategory = async (req,res,next) => {
  try {
    const result = await categoryServices.getCategoryTypeService(req.params.type);
    res.status(200).json({
      success:true,
      result,
    })
  } catch (error) {
    next(error)
  }
}

// delete category
exports.deleteCategory = async (req,res,next) => {
  try {
    const result = await categoryServices.deleteCategoryService(req.params.id);
    res.status(200).json({
      success:true,
      result,
    })
  } catch (error) {
    next(error)
  }
}

// update category
exports.updateCategory = async (req,res,next) => {
  try {
    const result = await categoryServices.updateCategoryService(req.params.id,req.body);
    res.status(200).json({
      status:'success',
      message:'Category update successfully',
      result,
    })
  } catch (error) {
    next(error)
  }
}

// get single category
exports.getSingleCategory = async (req,res,next) => {
  try {
    const result = await categoryServices.getSingleCategoryService(req.params.id);
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}