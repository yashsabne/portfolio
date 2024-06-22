require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose')
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files from the root directory

app.use(express.static(path.join(__dirname, "")));

mongoose.connect((process.env.MONGO_URL))

 ;
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Contact = new mongoose.model("Contact",ContactSchema);

// Define a route to serve your main HTML file
app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Define a POST route to handle form submissions
app.post('/get-contact',async (req, res) => {

    try {
        
    const { name, email, message } = req.body;

    const newContact = new Contact({ 
        name,
        email,
       message
     });
     
    await newContact.save();

    const fname = name.toUpperCase();

   
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.USEROTP,
                pass: process.env.PASSOTP
            }
        });

        const mailOptions = {
            from: email,
            to:  process.env.USEREMAIL,
            subject: `HELLO YASH YOU GOT MESSAGE FROM ${fname}`,
            html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #333;">New Contact Form Submission</h2>
                <p>Dear Yash,</p>
                <p>You have received a new message through your website's contact form. Here are the details of the submission:</p>
                <p><strong>Name:</strong> ${fname}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p style="background: #f9f9f9; padding: 15px; border: 1px solid #eee; border-radius: 5px;">${message}</p>
                <p>Please review the message and respond accordingly.</p>
           
              
                <p style="color: #777; font-size: 12px;">This email was generated automatically. Please do not reply to this email.</p>
            </div>
             `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Error sending email');
            } else {
                console.log('Email sent: ' + info.response);
                return res.sendFile(path.join(__dirname, 'thank.html'));
            }
        });
        
    } catch (error) {
        res.send('system error')
    }

 
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
