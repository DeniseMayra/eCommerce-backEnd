import mongoose from "mongoose";
import { COLLECTION_CARTS, COLLECTION_USERS, ROLE_ADMIN, ROLE_PREMIUM, ROLE_USER, USER_STATUS_COMPLETE, USER_STATUS_INCOMPLETE, USER_STATUS_PENDING } from "../../../clases/constant.js";

const usersCollection = COLLECTION_USERS;

const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: Number,
  password: {
    type: String,
    required: true
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: COLLECTION_CARTS
  },
  role: {
    type: String,
    enum: [ROLE_USER, ROLE_ADMIN, ROLE_PREMIUM],
    default: ROLE_USER
  },
  documents: {
    type: [
      {
        name: { type: String, required: true },
        reference: { type: String, required:true }
      }
    ],
    default: []
  },
  last_connection:{
    type: Date,
    default: null
  },
  status: {
    type: String,
    required: true,
    enum: [ USER_STATUS_PENDING, USER_STATUS_INCOMPLETE, USER_STATUS_COMPLETE],
    default: USER_STATUS_PENDING
  },
  avatar: {
    type: String,
    default: ''
  }
});

export const usersModel = mongoose.model(usersCollection, usersSchema);
