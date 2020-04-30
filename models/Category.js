const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name:{type: String, default: "unset"},
})

module.exports = model('Category', schema);
