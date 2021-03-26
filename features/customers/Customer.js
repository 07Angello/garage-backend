const { model, Schema } = require('mongoose');

const CustomerSchema = Schema({
    name: {
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
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});

CustomerSchema.virtual('cars', {
    ref: 'Car',
    localField: '_id',
    foreignField: 'customer',
    justOne: false
  });

module.exports = model('Customer', CustomerSchema);