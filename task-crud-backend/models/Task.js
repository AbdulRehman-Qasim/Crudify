// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zip: { type: String },
    dob: { type: String }, // or Date if you want real dates
    gender: { type: String },
    occupation: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);
