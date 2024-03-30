import mongoose from "mongoose";

const guestShema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    GuestNumber: {
        type: String,
        required: true,
    },
    PhoneNumber: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    time: {
        type: String,
        // required: true
    },
    date: {
        type: Date,
        // required: true
    }
}, {timestamps: true});

const GuestData = mongoose.model("GuestData", guestShema);

export default GuestData;