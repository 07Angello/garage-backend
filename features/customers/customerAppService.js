
const { response } = require('express');
const Customer = require('./Customer');
const User = require('../authentication/User');

// POST: api/customers/
const createCustomer = async(req, res = response) => {
    const customer = new Customer(req.body);
    
    try {
        const newCustomer = await customer.save();

        newCustomer.cars = [];

        res.status(201).json({
            OK: true,
            Message: '',
            Data: newCustomer
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

// GET: api/customers/:customerName
const getCustomers = async( req, res = response ) => {
    const customerName = req.params.customerName;
    const customerFilter = customerName == null || customerName == '' || customerName == 'ALL' ? '' : customerName;
    const regex = new RegExp(customerFilter, 'i');

    await Customer.find({"name": regex})
                .sort({'name': 'ascending' })
                .populate({
                    path: 'cars',
                    populate: {
                        path: 'maintenances'
                    }
                })
                .exec(( err, customers ) => {
                    if (err) {
                        return res.status(400).json({
                            OK: false,
                            Data: null,
                            Message: err.message
                        });
                    }

                    if (!customers || customers.length === 0) {
                        return res.status(200).json({
                            OK: true,
                            Data: [],
                            Message: 'There are no customers to show.'
                        });
                    }

                    return res.status(200).json({
                        OK: true,
                        Data: customers,
                        Message: ''
                    });
                });
}

// PUT: api/customers/:id
const updateCustomer = async(req, res = response) => {
    const customerId = req.params.id;
    const uid = req.uid;

    const customer = await Customer.findById( customerId )
                                    .populate('cars');

    try {
        if ( !customer ) {
            return res.status(404).json({
                OK: false,
                Data: null,
                Message: 'Could not find any customer to update'
            });
        }

        if ( customer.user.id !== uid ) {
            return res.status(401).json({
                OK: false,
                Data: null,
                Message: 'Your are NOT the owner of this customer. Could not be updated.'
            });
        }

        const newCustomer = {
            ...req.body,
            isEdited: true,
            user: uid
        }

        const customerUpdate = await Customer.findByIdAndUpdate(customerId, newCustomer, { new: true })
                                        .populate( 'user', 'name profilePhoto' );
            
        return res.status(201).json({
            OK: true,
            Data: customerUpdate,
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

// DELETE: api/customer/:id
const deleteCustomer = async(req, res = response) => {
    const customerId = req.params.id;

    const customer = await Customer.findById( customerId )
                            .populate( 'user', '_id' );;

    try {
        if ( !customer ) {
            return res.status(404).json({
                OK: false,
                Data: null,
                Message: 'Could not find any customer to delete.'
            });
        }

        await Customer.findByIdAndDelete( customerId );

        return res.status(200).json({
            OK: true,
            Data: customer,
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
    createCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer
}