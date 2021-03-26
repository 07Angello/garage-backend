const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../../middlewares/fieldsValidator');
const { createMaintenances, getMaintenances, updateMaintenance, deleteMaintenance } = require('./maintenanceAppService');
const { jwtValidator } = require('../../middlewares/jwtValidator');

const router = Router();
router.use( jwtValidator );

/*
    Maintenance Routes
    host + /api/maintenances
*/

router.post('/',
    [
        check("description", "The Maintenance description can not be null or empty.").not().isEmpty(),
        check("mechanic", "The Mechanic can not be null or empty.").not().isEmpty(),
        fieldsValidator
    ],
    createMaintenances);

router.get("/:id", getMaintenances);

router.put("/:id",
    [
        check("description", "The Maintenance description can not be null or empty.").not().isEmpty(),
        check("mechanic", "The Mechanic can not be null or empty.").not().isEmpty(),
        fieldsValidator
    ],
    updateMaintenance);

router.delete("/:id", deleteMaintenance);


module.exports = router;