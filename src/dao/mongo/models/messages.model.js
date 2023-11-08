import { mongoose } from 'mongoose';

const messageCollection = 'messages';

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
