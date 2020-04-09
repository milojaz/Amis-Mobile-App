var mongoose = require('mongoose');
var Schema = mongoose.Schema

var tradeFlowSchema = new Schema({
    product: {
        type: String,
        required: true,
    },
    tonage: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    enumerator: {
        type: String,
        required: true,
    },
    locality_from: {
        type: String,
        required: true,
    },
    chiefdom_from: {
        type: String,
        required: true,
    },
    district_from: {
        type: String,
        required: true,
    },
    locality_to: {
        type: String,
        required: true,
    },
    chiefdom_to: {
        type: String,
        required: true,
    },
    district_to: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }

});

var tradeFlowData = mongoose.model('tradeFlowData', tradeFlowSchema);
module.exports = tradeFlowData