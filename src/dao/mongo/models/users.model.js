import mongoose from "mongoose";
import { COLLECTION_CARTS, COLLECTION_USERS, ROLE_ADMIN, ROLE_PREMIUM, ROLE_USER } from "../../../clases/constant.js";

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
  }
});

export const usersModel = mongoose.model(usersCollection, usersSchema);
