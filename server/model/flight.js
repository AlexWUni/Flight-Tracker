//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

let FlightModel = mongoose.Schema({
    Date: String,
    Aircraft_Type: String,
    Aircraft_Registration: String,
    Pilot_In_Command: String,
    Departure_Location: String,
    Arrival_Location: String,
    Hours_Flown: Number,
},
{
    collection:"FlightsCollection"
});
module.exports =mongoose.model('Flight',FlightModel);
