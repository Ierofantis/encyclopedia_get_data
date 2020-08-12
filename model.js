const mongoose = require('mongoose');

//Request schema
const RequestSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    country: {
        type: String,
    },
    genre: {
        type: String,
    },
    state: {
        type: String,
    },
});

const Request = mongoose.model('Request', RequestSchema);

exports.Request = Request;
