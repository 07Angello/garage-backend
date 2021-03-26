const { model, Schema } = require('mongoose');

const MaintenanceSchema = Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    mechanic: {
        type: String,
        required: true,
        trim: true
    },
    costPrice: {
        type: Number,
        required: true
    },
    creationDate: {
        type: String
    },
    car: {
        type: Schema.Types.ObjectId,
        ref: "Car"
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});

module.exports = model('Maintenance', MaintenanceSchema);
