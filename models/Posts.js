const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    catId:{type: Schema.Types.ObjectId, ref: 'Category'},
    title:{type: String, default: ""},
    content:{type: String, default: ""},
    Date:{type: Date, default: Date.now},
    userId:{type: Schema.Types.ObjectId, ref: 'User'},
})

module.exports = model('Posts', schema);
