
const { response } = require('express');
const Car = require('./Car');
const Maintenance = require('../maintenances/Maintenance');

// POST: api/cars/
const createCar = async(req, res = response) => {
    const car = new Car(req.body);
    const cid = req.body.cid;
    
    try {
        car.customer = cid;

        const newCar = await car.save();

        newCar.maintenances = [];

        res.status(201).json({
            OK: true,
            Message: '',
            Data: newCar
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            OK: false,
            Message: 'An error has ocurred. Contact with the IT manager.',
            Data: null
        });
    }
}

// GET: api/cars/:customerName/:id
const getCars = async( req, res = response ) => {
    const customerId = req.params.id;

    await Car.find({ "customer": customerId })
                .sort({'createdAt': 'descending' })
                .populate('maintenances')
                .exec(( err, cars ) => {
                    if (err) {
                        return res.status(400).json({
                            OK: false,
                            Data: null,
                            Message: err.message
                        });
                    }

                    if (!cars || cars.length === 0) {
                        return res.status(200).json({
                            OK: true,
                            Data: [],
                            Message: 'There are no cars to show.'
                        });
                    }

                    return res.status(200).json({
                        OK: true,
                        Data: cars,
                        Message: ''
                    });
                });
}

// PUT: api/cars/:id
const updateCar = async(req, res = response) => {
    const carId = req.params.id;

    const car = await Car.findById( carId )
                            .populate('maintenances');

    try {
        if ( !car ) {
            return res.status(404).json({
                OK: false,
                Data: null,
                Message: 'Could not find any car to update'
            });
        }

        const newCar = {
            ...req.body
        }

        const carUpdate = await Car.findByIdAndUpdate(carId, newCar, { new: true })
                                        .populate( 'user', 'name profilePhoto' );
            
        return res.status(201).json({
            OK: true,
            Data: carUpdate,
            Message: ''
        });
    } catch ( error ) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            Data: null,
            Message: 'An error has ocurred. Contact with the IT manager.'
        });
    }
}

// DELETE: api/car/:id
const deleteCar = async(req, res = response) => {
    const carId = req.params.id;

    const car = await Car.findById( carId )
                            .populate( 'maintenances');

    try {
        if ( !car ) {
            return res.status(404).json({
                OK: false,
                Data: null,
                Message: 'Could not find any car to delete.'
            });
        }

        car.maintenances.map(async(maintenance) => {
            await Maintenance.findByIdAndDelete( maintenance._id );
        });

        await Car.findByIdAndDelete( carId );

        return res.status(200).json({
            OK: true,
            Data: car,
            Message: ''
        });
    } catch ( error ) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            Data: null,
            Message: 'An error has ocurred. Contact with the IT manager.'
        });
    }
}

module.exports = {
    createCar,
    getCars,
    updateCar,
    deleteCar
}