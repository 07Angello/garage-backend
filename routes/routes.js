const { Router } = require('express');
const router = Router();
const apiPrefix = '/api';


// Importing Routes
const authentication = require('../features/authentication/authRoutes');
const customers = require('../features/customers/customerRoutes');
const cars = require('../features/cars/carRoutes');
const maintenances = require('../features/maintenances/maintenanceRoutes');

// Implementing Routes
router.use(`${apiPrefix}/auth`, authentication);
router.use(`${apiPrefix}/customers`, customers);
router.use(`${apiPrefix}/cars`, cars);
router.use(`${apiPrefix}/maintenances`, maintenances);


module.exports = router;
