var mongoose = require('mongoose');
var Schema = mongoose.Schema


var exportFlowSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    products: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    tonage: {
        type: Number,
        required: true
    },
    value: {
        type: Number,
    },
    district: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    districtFrom: {
        type: String,
        required: true
    },
    countryTO: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }

});

var ExportFlowData = mongoose.model('ExportFlowData', exportFlowSchema);
module.exports = ExportFlowData