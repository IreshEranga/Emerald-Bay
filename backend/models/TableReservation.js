const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tableReservationSchema = new Schema(
    {
        reservationId: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        tableNo: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: true,
            default: Date.now // Set default to current date
        },
        time: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("TableReservation", tableReservationSchema);