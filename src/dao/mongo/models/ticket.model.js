import { mongoose } from 'mongoose';
import { COLLECTION_TICKETS } from '../../../clases/constant.js';

const ticketCollection = COLLECTION_TICKETS;

const ticketSchema = new mongoose.Schema({
  code: {
    required: true,
    type: String,
    unique: true
  },
  purchase_datetime: {
    type: Date
  },
  amount: {
    required: true,
    type: Number
  },
  purchaser: {
    required: true,
    type: String
  }
});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);
