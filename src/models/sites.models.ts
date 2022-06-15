import { Schema, model } from "mongoose";
import logging from "../config/logging";
import ISite from "../interfaces/ISite";
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

const SiteSchema: Schema = new Schema(
  {
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
      type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  }
);

SiteSchema.post<ISite>('save', function () {
    logging.info('Mongo', 'Checkout the site we just saved: ', this);
});

SiteSchema.plugin(mongoosePagination)

const Site: Pagination<ISite> = model<ISite, Pagination<ISite>>('Sites', SiteSchema);

export default Site