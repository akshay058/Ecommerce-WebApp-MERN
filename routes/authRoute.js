import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";
const router = express.Router();

//routing
//Register Method Post
router.post("/register", registerController);

// login || POST
router.post("/login", loginController);
export default router;
