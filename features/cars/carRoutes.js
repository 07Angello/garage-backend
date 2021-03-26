const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../../middlewares/fieldsValidator');
const { createCar, getCars, updateCar, deleteCar } = require('./carAppService');
const { jwtValidator } = require('../../middlewares/jwtValidator');
const { isGratherThanZero } = require('../../helpers/isGratherThanZero');

const router = Router();
router.use( jwtValidator );

/*
    Cars Routes
    host + /api/cars
*/

router.post('/',
    [
        check("make", "The Car brand can not be null or empty.").not().isEmpty(),
        check("model", "The Car model can not be null or empty.").not().isEmpty(),
        check("year", "El monto del gasto no puede ser cero.").isNumeric().custom( isGratherThanZero ),
        fieldsValidator
    ],
    createCar);

router.get("/:id", getCars);

router.put("/:id",
    [
        check("make", "The Car brand can not be null or empty.").not().isEmpty(),
        check("model", "The Car model can not be null or empty.").not().isEmpty(),
        check("year", "El monto del gasto no puede ser cero.").isNumeric().custom( isGratherThanZero ),
        fieldsValidator
    ],
    updateCar);

router.delete("/:id", deleteCar);


module.exports = router;