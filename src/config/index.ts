import {config as configDotenv} from 'dotenv'

configDotenv()

const MAIL_CREDENTIALS = {
    name: process.env.MAILNAME,
    password: process.env.MAILPASSWORD
}

const ACCESS_TOKEN_CONFIG = {
    secret: process.env.ACCESS_TOKEN_SECRET || 'my-secret'
}

const CLOUDINARY_CREDENTIALS = {
    name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
}

const MONGO_OPTIONS = {
    maxPoolSize:50,
    wtimeoutMS:2500,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DATABASE = process.env.MONGO_DATABASE;
const MONGO_URL = process.env.MONGO_URL || `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.ruh0x.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`;

const MONGO = {
    options: MONGO_OPTIONS,
    url: MONGO_URL
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 5500;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    mongo: MONGO,
    server: SERVER,
    email: MAIL_CREDENTIALS,
    cloudinary: CLOUDINARY_CREDENTIALS,
    token: ACCESS_TOKEN_CONFIG
};

export default config;
