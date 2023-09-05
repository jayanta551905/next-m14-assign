const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = jwt.sign({ email }, "NEXTAUTH_SECRET", {
      expiresIn: "1h",
    });

    const newUser = new User({
      email,
      password: hashedPassword,
      verificationToken,
    });
    await newUser.save();

    const transporter = nodemailer.createTransport({
      service: "your-email-service",
      auth: {
        user: "your-email@example.com",
        pass: "your-email-password",
      },
    });

    const mailOptions = {
      from: "your-email@example.com",
      to: email,
      subject: "Email Verification",
      html: `<p>Click <a href="http://localhost:3000/verify/${verificationToken}">here</a> to verify your email</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "User registered. Please check your email for verification.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
});

module.exports = router;
