import express from "express";
import { protect } from "../middlewares/authMiddleware.js"
import {
    addNewAdmin,
    addNewDoctor,
    getAllDoctors,
    getUserDetails,
    login,
    logoutAdmin,
    logoutPatient,
    patientRegister,
} from "../controller/userController.js" // Adjust path if necessary
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Patient routes
router.post("/patient/register", patientRegister); // Register a new patient
router.get("/patient/me", isPatientAuthenticated, getUserDetails); // Get patient profile
router.get("/patient/logout", isPatientAuthenticated, logoutPatient); // Logout patient

// Admin routes
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin); // Add new admin
router.get("/admin/me", isAdminAuthenticated, getUserDetails); // Get admin details
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin); // Logout admin

// Doctor routes
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor); // Add new doctor
router.get("/doctors", getAllDoctors); // Get all doctors

// General login route
router.post("/login", login); // Patient or admin login

export default router;