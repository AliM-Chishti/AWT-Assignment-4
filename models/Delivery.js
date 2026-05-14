const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  senderName: {
    type: String,
    required: true
  },

  receiverName: {
    type: String,
    required: true
  },

  pickupLocation: {
    type: String,
    required: true
  },

  dropoffLocation: {
    type: String,
    required: true
  },

  packageWeight: {
    type: Number,
    required: true
  },

  droneId: {
    type: String,
    required: true
  },

  deliveryStatus: {
    type: String,
    enum: ["Pending", "In-Transit", "Delivered", "Cancelled"],
    default: "Pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Delivery", deliverySchema);