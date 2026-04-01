const paymentMethodController = require('../controllers/paymentMethod.controller');

const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');

router.use(auth);

router.post('/', paymentMethodController.createMethod);
router.get('/', paymentMethodController.getMethods);
router.put('/:id', paymentMethodController.updateMethod);
router.delete('/:id', paymentMethodController.deleteMethod);

module.exports = router;

