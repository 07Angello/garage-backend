const { model, Schema } = require('mongoose');

const CustomerSchema = Schema({
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

CommentSchema.virtual('cars', {
    ref: 'Car',
    localField: '_id',
    foreignField: 'customer',
    justOne: false
  });

module.exports = model('Customer', CustomerSchema);