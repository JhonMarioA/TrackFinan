const paymentMethodController = require('../controllers/paymentMethod.controller');

const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const { validate, validateParams } = require('../middlewares/validate.middleware');
const { createPaymentMethodBodySchema, updatePaymentMethodBodySchema, paymentMethodParamSchema } = require('../schemas/payment.schema');

router.use(auth);

router.post('/', validate(createPaymentMethodBodySchema), paymentMethodController.createMethod);
router.get('/', paymentMethodController.getMethods);
router.put('/:id', validateParams(paymentMethodParamSchema), validate(updatePaymentMethodBodySchema), paymentMethodController.updateMethod);
router.delete('/:id', validateParams(paymentMethodParamSchema), paymentMethodController.deleteMethod);

module.exports = router;

