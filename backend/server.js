const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
 
const SENDER_EMAIL = process.env.SENDER_EMAIL || "noreply@rentsmart.fun";
const SENDER_NAME = process.env.SENDER_NAME || "RentSmart";
 
const OWNER_EMAIL = process.env.OWNER_EMAIL;

function brevoHeaders() {
  return {
    "api-key": process.env.BREVO_API_KEY,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.post("/send", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Missing required fields." });
  }

  try { 
    const notifyOwner = axios.post(
      BREVO_API_URL,
      {
        sender: { name: SENDER_NAME, email: SENDER_EMAIL },
        to: [{ email: 'yashsabne39@gmail.com' }],
        replyTo: { email, name },
        subject: subject ? `New contact form: ${subject}` : `New contact form submission from ${name}`,
        htmlContent: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      },
      { headers: brevoHeaders() }
    );
 
    const confirmSender = axios.post(
      BREVO_API_URL,
      {
        sender: { name: SENDER_NAME, email: SENDER_EMAIL },
        to: [{ email, name }],
        subject: "We've received your message",
        htmlContent: `
          <p>Hi ${name},</p>
          <p>Thanks for reaching out! We've received your message and will get back to you shortly.</p>
          <p><strong>Your message:</strong></p>
          <p>${message}</p>
          <br/>
          <p>— The RentSmart Team</p>
        `,
      },
      { headers: brevoHeaders() }
    );

    await Promise.all([notifyOwner, confirmSender]);

    res.status(200).json({ success: true, message: "Emails sent successfully!" });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));