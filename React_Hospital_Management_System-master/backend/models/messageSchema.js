import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [2, "First Name Must Contain At Least 3 Characters!"],
    },
    lastName: {
      type: String,
      required: true,
      minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
    },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Provide A Valid Email!"],
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v);  // Ensures exactly 10 digits
        },
        message: "Phone Number Must Contain Exactly 10 Digits!",
      },
    },
    message: {
      type: String,
      required: true,
      minLength: [10, "Message Must Contain At Least 10 Characters!"],
      maxLength: [500, "Message Must Not Exceed 500 Characters!"],
    },
  },
  { timestamps: true }  // Adds createdAt and updatedAt fields
);

export const Message = mongoose.model("Message", messageSchema);