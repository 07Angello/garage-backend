const { model, Schema } = require('mongoose');

const MaintenanceSchema = Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    creationDate: {
        type: String
    },
    car: {
        type: Schema.Types.ObjectId,
        ref: "Car"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});

module.exports = model('Maintenance', MaintenanceSchema);
