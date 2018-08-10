const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const superUserSchema = new Schema({
    name: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    securityPasscode: { type: String, required: true}
});

module.exports = mongoose.model('User', superUserSchema);