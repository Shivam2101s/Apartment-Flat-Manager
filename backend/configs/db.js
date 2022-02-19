const mongoose = require('mongoose');

module.exports = () => {
    return mongoose.connect("mongodb+srv://shivam:shivam@cluster0.u8fk7.mongodb.net/Apartments");
}