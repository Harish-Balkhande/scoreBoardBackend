import express from "express";
import { saveLiveData } from "../controllers/adminController.js";

const adminRoutes = express.Router();

adminRoutes.post("/", saveLiveData); // Create user
// router.get("/", getUsers); // Get all users
// router.get("/:id", getUserById); // Get a user by ID
// router.put("/:id", updateUser); // Update user by ID
// router.delete("/:id", deleteUser); // Delete user by ID

export default adminRoutes;
