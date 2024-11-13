import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

// Helper function to validate required fields
const validateFields = (requiredFields, body, next) => {
  for (const field of requiredFields) {
    if (!body[field]) {
      return next(new ErrorHandler(`Missing required field: ${field}`, 400));
    }
  }
};

// Register a new patient
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'nic', 'dob', 'gender', 'password'];
  
  // Validate required fields
  validateFields(requiredFields, req.body, next);
  
  const { firstName, lastName, email, phone, nic, dob, gender, password } = req.body;
  
  // Check if the email is already registered
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("User already registered with this email!", 400));
  }

  // Create a new user as a Patient
  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Patient",
  });

  // Generate token and send response
  generateToken(user, "Patient registered successfully!", 200, res);
});

// Admin registration
export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'nic', 'dob', 'gender', 'password'];

  // Validate required fields
  validateFields(requiredFields, req.body, next);

  const { firstName, lastName, email, phone, nic, dob, gender, password } = req.body;

  // Check if the admin is already registered
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("Admin with this email already exists!", 400));
  }

  // Create new admin user
  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Admin",
  });

  res.status(201).json({
    success: true,
    message: "New admin registered successfully!",
    admin,
  });
});

// Doctor registration
export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'nic', 'dob', 'gender', 'password', 'doctorDepartment'];
  validateFields(requiredFields, req.body, next);

  if (!req.files || !req.files.docAvatar) {
    return next(new ErrorHandler("Doctor avatar is required!", 400));
  }

  const { firstName, lastName, email, phone, nic, dob, gender, password, doctorDepartment } = req.body;
  const docAvatar = req.files.docAvatar;

  // Validate avatar file type
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("Unsupported file format for avatar!", 400));
  }

  // Check if doctor is already registered
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("Doctor with this email already exists!", 400));
  }

  // Upload doctor avatar to cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    return next(new ErrorHandler("Failed to upload doctor avatar to Cloudinary!", 500));
  }

  // Create new doctor user
  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Doctor",
    doctorDepartment,
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "New doctor registered successfully!",
    doctor,
  });
});

// Login user (admin or patient)
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;

  // Validate required fields
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please fill all the fields!", 400));
  }

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Password and Confirm Password do not match!", 400));
  }

  // Check if user exists
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password!", 400));
  }

  // Check password
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid email or password!", 400));
  }

  // Check user role
  if (role !== user.role) {
    return next(new ErrorHandler("User role does not match!", 400));
  }

  // Generate token and send response
  generateToken(user, "Login successful!", 200, res);
});

// Get all doctors
export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });

  res.status(200).json({
    success: true,
    doctors,
  });
});

// Get user details
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    user,
  });
});

// Logout function for dashboard admin
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res.status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin logged out successfully.",
    });
});

// Logout function for frontend patient
export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res.status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient logged out successfully.",
    });
});