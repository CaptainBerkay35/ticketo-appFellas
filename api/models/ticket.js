const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user
  flightNumber: String,
  departure: String,
  departureTime: String,
  destination: String,
  city:String,
  price: Number,
  purchaseDate: { type: Date, default: Date.now },
  terminal:String,
  aircraft:String,
  visa:String,
  baggage:[String],
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;