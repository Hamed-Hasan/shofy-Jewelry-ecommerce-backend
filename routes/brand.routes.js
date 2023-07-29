const express = require('express');
const router = express.Router();
// internal
const brandController = require('../controller/brand.controller');

// add Brand
router.post('/add',brandController.addBrand);
// add All Brand
router.post('/add-all',brandController.addAllBrand);
// get Active Brands
router.get('/active',brandController.getActiveBrands);
// get all Brands
router.get('/all',brandController.getAllBrands);
// delete brand
router.delete('/delete/:id',brandController.deleteBrand);
// get single
router.get('/get/:id', brandController.getSingleBrand);
// delete product
router.patch('/edit/:id', brandController.updateBrand);

module.exports = router;