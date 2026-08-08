const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// =========================
// SIGNUP
// =========================

module.exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for empty fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // Check for existing username
    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already exists!",
      });
    }

    // Check for existing email
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists!",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Response without password
    const userResponse = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      rating: newUser.rating,
      gamesPlayed: newUser.gamesPlayed,
      wins: newUser.wins,
      losses: newUser.losses,
      draws: newUser.draws,
    };

    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: userResponse,
    });
  } catch (err) {
    console.log("Signup error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// =========================
// LOGIN
// =========================

module.exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Check for missing fields
    if (!identifier || !password) {
      return res.status(401).json({
        success: false,
        message: "Some fields are missing",
      });
    }

    // Find user by username OR email
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    // Check if user exists
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist!",
      });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password!",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    // Store JWT in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        rating: user.rating,
        gamesPlayed: user.gamesPlayed,
        wins: user.wins,
        losses: user.losses,
        draws: user.draws,
      },
    });
  } catch (err) {
    console.log("Login error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// =========================
// CHECK CURRENT USER
// =========================

module.exports.isUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User authenticated.",
      user,
    });
  } catch (err) {
    console.log("isUser error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// =========================
// LOGOUT
// =========================

module.exports.logout = (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Logout successful!",
    });
  } catch (err) {
    console.log("Logout error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
