import mongoose from 'mongoose'
import config from './config/index'
import logging from './config/logging'

const NAMESPACE = 'Server';

mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((_result) => {
        logging.info(NAMESPACE, 'Mongo Connected');
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
    });