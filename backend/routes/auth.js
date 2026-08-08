const express = require("express");

const router = express.Router();

const { signup, login, isUser, logout } = require("../controllers/auth");

const { auth } = require("../middleware/auth");

// =========================
// PUBLIC ROUTES
// =========================

router.post("/signup", signup);

router.post("/login", login);

// =========================
// PROTECTED ROUTES
// =========================

// Check currently logged-in user
router.get("/isUser", auth, isUser);

// Logout
router.post("/logout", auth, logout);

module.exports = router;
