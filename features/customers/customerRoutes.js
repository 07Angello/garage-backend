const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../../middlewares/fieldsValidator');
const { createCustomer, getCustomers, updateCustomer, deleteCustomer } = require('./customerAppService');
const { jwtValidator } = require('../../middlewares/jwtValidator');

const router = Router();
router.use( jwtValidator );

/*
    Customers Routes
    host + /api/customers
*/

router.post('/',
    [
        check("name", "The Customer Name can not be null or empty.").not().isEmpty(),
        fieldsValidator
    ],
    createCustomer);

router.get("/:customerName", getCustomers);

router.put("/:id",
    [
        check("name", "The Customer Name can not be null or empty.").not().isEmpty(),
        fieldsValidator
    ],
    updateCustomer);

router.delete("/:id", deleteCustomer);


module.exports = router;