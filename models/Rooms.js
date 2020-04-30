const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    reservation:{type: Boolean, default: false},
    roomNumber:{type: Number, default: 23},
    reservDateStart:{type: Date, default: Date.now},
    reservDateEnd:{type: Date, default: Date.now},
    reservUserId:{type: Types.ObjectId, ref: 'Link'},
})

module.exports = model('Rooms', schema);
