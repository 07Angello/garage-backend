const { model, Schema } = require('mongoose');

const CarSchema = Schema({
    make: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    plate: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true
    },
    creationDate: {
        type: String
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: "Customer"
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});

CarSchema.virtual('maintenances', {
    ref: 'Maintenance',
    localField: '_id',
    foreignField: 'car',
    justOne: false
  });

module.exports = model('Car', CarSchema);
