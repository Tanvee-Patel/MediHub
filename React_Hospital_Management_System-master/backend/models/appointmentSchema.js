import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name Is Required!"],
    minLength: [2, "First Name Must Contain At Least 3 Characters!"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name Is Required!"],
    minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Email Is Required!"],
    validate: [validator.isEmail, "Provide A Valid Email!"],
  },
  phone: {
    type: String,
    required: [true, "Phone Is Required!"],
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v);  // Ensures exactly 11 digits
      },
      message: "Phone Number Must Contain Exactly 11 Digits!",
    },
  },
  nic: {
    type: String,
    required: [true, "NIC Is Required!"],
    validate: {
      validator: function (v) {
        return /^[0-3]{4}$/.test(v);  // Ensures exactly 13 digits
      },
      message: "NIC Must Contain Exactly 13 Digits!",
    },
  },
  dob: {
    type: Date,
    required: [true, "DOB Is Required!"],
  },
  gender: {
    type: String,
    required: [true, "Gender Is Required!"],
    enum: ["Male", "Female"],
  },
  appointment_date: {
    type: Date,  // Changed to Date for easier manipulation
    required: [true, "Appointment Date Is Required!"],
  },
  department: {
    type: String,
    required: [true, "Department Name Is Required!"],
  },
  doctor: {
    firstName: {
      type: String,
      required: [true, "Doctor First Name Is Required!"],
    },
    lastName: {
      type: String,
      required: [true, "Doctor Last Name Is Required!"],
    },
  },
  hasVisited: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
    required: [true, "Address Is Required!"],
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",  // Assuming doctors are stored in the User model
    required: [true, "Doctor Id Is Invalid!"],
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",  // Assuming patients are stored in the User model
    required: [true, "Patient Id Is Required!"],
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);