const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vipRoomReservationSchema = new Schema(
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
        guests: {
            type: Number,
            required: true,
            default: 1 // Default value for number of guests
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

module.exports = mongoose.model("VIPRoomReservation", vipRoomReservationSchema);