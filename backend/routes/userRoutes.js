import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get( getAllUsers);

router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router
  .route("/profile")
  .get( getCurrentUserProfile)
  .put( updateCurrentUserProfile);

// ADMIN ROUTES 👇
router
  .route("/:id")
  .delete( authorizeAdmin, deleteUserById)
  .get(  getUserById)
  .put( updateUserById);

export default router;
