import { mongoose } from 'mongoose';
import { COLLECTION_MESSAGES } from '../../../clases/constant.js';

const messageCollection = COLLECTION_MESSAGES;

const messageSchema = new mongoose.Schema({ 
  user: {
    type: String,
    required: true,
    unique: true
  },
  message: {
    type: String
  }
});

export const messageModel = mongoose.model(messageCollection, messageSchema);
