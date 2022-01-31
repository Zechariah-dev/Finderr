const { Schema, model } = require('mongoose');

const BusinessSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 80
    },
    image: {
        type: String
    },
    slug: {
        type: String
    },
    category: [String],
    description: {
        type: String,
    },
    map: {
        lat: Number,
        long: Number
    },
    tags: [String],
    contact: {
        phone_number: {
            type: String,
        },
        whatsapp_number: {
            type: String,
        },
        website: {
            type: String
        },
        email: {
            type: String
        },
        address: {
            type: String
        }
    },
    sum_review: Number,
    total_reviews: Number,
    average_review: Number,
    isRegistered: {
        type: Boolean,
        default: false
    },
    company_legal_name: {
        type: String
    },
    company_registration_number: {
        type: String
    },
    company_address: {
        type: String
    }
}, {
    timestamps: true
});

BusinessSchema.pre('save', function () {
    let business = this;

    business.average_review = business.sum_review / business.total_reviews
})

module.exports = model('business', BusinessSchema);