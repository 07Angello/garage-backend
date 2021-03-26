
const { response } = require('express');
const Maintenance = require('./Maintenance');
const Car = require('../cars/Car');

// POST: api/maintenances/
const createMaintenances = async(req, res = response) => {
    const maintenance = new Maintenance(req.body);
    const cid = req.body.cid;

    try {
        maintenance.car = cid;

        const newMaintenance = await maintenance.save();

        res.status(201).json({
            OK: true,
            Message: '',
            Data: newMaintenance
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

// GET: api/maintenances/:id
const getMaintenances = async( req, res = response ) => {
    const carId = req.params.id;

    await Maintenance.find({ "car": carId })
                .sort({'createdAt': 'descending' })
                .exec(( err, maintenances ) => {
                    if (err) {
                        return res.status(400).json({
                            OK: false,
                            Data: null,
                            Message: err.message
                        });
                    }

                    if (!maintenances || maintenances.length === 0) {
                        return res.status(200).json({
                            OK: true,
                            Data: [],
                            Message: 'There are no maintenances to show.'
                        });
                    }

                    return res.status(200).json({
                        OK: true,
                        Data: maintenances,
                        Message: ''
                    });
                });
}

// PUT: api/maintenances/:id
const updateMaintenance = async(req, res = response) => {
    const maintenanceId = req.params.id;

    const maintenance = await Maintenance.findById( maintenanceId )
                                    .populate('car');

    try {
        if ( !maintenance ) {
            return res.status(404).json({
                OK: false,
                Data: null,
                Message: 'Could not find any maintenance to update'
            });
        }

        const newMaintenance = {
            ...req.body,
            isEdited: true,
            user: uid
        }

        const maintenanceUpdate = await Maintenance.findByIdAndUpdate(maintenanceId, newMaintenance, { new: true })
                                        .populate( 'user', 'name profilePhoto' );
            
        return res.status(201).json({
            OK: true,
            Data: maintenanceUpdate,
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

// DELETE: api/maintenances/:id
const deleteMaintenance = async(req, res = response) => {
    const maintenanceId = req.params.id;

    const maintenance = await Maintenance.findById( maintenanceId )
                            .populate('car');;

    try {
        if ( !maintenance ) {
            return res.status(404).json({
                OK: false,
                Data: null,
                Message: 'Could not find any maintenance to delete.'
            });
        }

        const car = await Car.findById( maintenance.car );
        await Maintenance.findByIdAndDelete( maintenanceId );

        maintenance.car = car;

        return res.status(200).json({
            OK: true,
            Data: maintenance,
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
    createMaintenances,
    getMaintenances,
    updateMaintenance,
    deleteMaintenance
}