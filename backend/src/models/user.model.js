import mongoose, { Schema } from "mongoose";

const userSchem = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tocken: { type: String },
});

const User = mongoose.model("User", userSchem);

export { User };
