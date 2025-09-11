const express = require("express");
const nodemailer =require("nodemailer");
const cors = require("cors");
const bodyParser =require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Brevo SMTP transporter
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587, // or 465
  auth: {
    user: process.env.SMTP_USER,  
    pass: process.env.SMTP_PASS,  
  },
});

// Test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});
 
app.post("/send", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.BREVO_EMAIL, // your email to receive messages 
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    });

    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
