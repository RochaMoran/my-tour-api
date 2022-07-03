"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const logging_1 = __importDefault(require("../config/logging"));
const mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
const SiteSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    covidMeasures: {
        vaccineCovid: {
            type: Boolean,
            required: true,
        },
        faceMask: {
            type: Boolean,
            required: true,
        },
        statusOpen: {
            type: Boolean,
            required: true,
        },
    },
    attentionSchedules: {
        open: {
            type: String,
            required: true,
        },
        close: {
            type: String,
            required: true,
        },
    },
    location: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
        latitudeDelta: {
            type: Number,
            required: true,
        },
        longitudeDelta: {
            type: Number,
            required: true,
        },
    },
    created_by: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    tags: {
        type: Array
    },
    rate: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
});
SiteSchema.post('save', function () {
    logging_1.default.info('Mongo', 'Checkout the site we just saved: ', this);
});
SiteSchema.plugin(mongoose_paginate_ts_1.mongoosePagination);
const Site = (0, mongoose_1.model)('Sites', SiteSchema);
exports.default = Site;
