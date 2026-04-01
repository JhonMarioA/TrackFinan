const categoryRoutes = require('../controllers/category.controller');
const express = require('express');
const router = express.Router();

const auth= require('../middlewares/auth.middleware');

router.use(auth);

router.post('/', categoryRoutes.createCategory);
router.get('/', categoryRoutes.getCategories);
router.put('/:id', categoryRoutes.updateCategory);
router.delete('/:id', categoryRoutes.deleteCategory);

module.exports = router;