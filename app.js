require("dotenv").config();const express=require("express"),path=require("path"),bodyParser=require("body-parser"),nodemailer=require("nodemailer"),mongoose=require("mongoose"),app=express(),PORT=process.env.PORT||3e3;app.use(bodyParser.json()),app.use(bodyParser.urlencoded({extended:!0})),app.use(express.static(path.join(__dirname,""))),mongoose.connect(process.env.MONGO_URL);const Schema=mongoose.Schema,ContactSchema=new Schema({name:{type:String,required:!0},email:{type:String,required:!0},message:{type:String,required:!0},date:{type:Date,default:Date.now}}),Contact=new mongoose.model("Contact",ContactSchema);app.get("/",async(e,o)=>{o.sendFile(path.join(__dirname,"index.html"))}),app.post("/get-contact",async(e,o)=>{try{let{name:s,email:a,message:t}=e.body,r=new Contact({name:s,email:a,message:t});await r.save();let n=s.toUpperCase(),p=nodemailer.createTransport({host:"smtp-relay.brevo.com",port:587,secure:!1,auth:{user:process.env.USEROTP,pass:process.env.PASSOTP}}),d={from:a,to:process.env.USEREMAIL,subject:`HELLO YASH YOU GOT MESSAGE FROM ${n}`,html:`
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #333;">New Contact Form Submission</h2>
                <p>Dear Yash,</p>
                <p>You have received a new message through your website's contact form. Here are the details of the submission:</p>
                <p><strong>Name:</strong> ${n}</p>
                <p><strong>Email:</strong> ${a}</p>
                <p><strong>Message:</strong></p>
                <p style="background: #f9f9f9; padding: 15px; border: 1px solid #eee; border-radius: 5px;">${t}</p>
                <p>Please review the message and respond accordingly.</p>
           
              
                <p style="color: #777; font-size: 12px;">This email was generated automatically. Please do not reply to this email.</p>
            </div>
             `};p.sendMail(d,(e,s)=>e?(console.error(e),o.status(500).send("Error sending email")):(console.log("Email sent: "+s.response),o.sendFile(path.join(__dirname,"thank.html"))))}catch(i){o.send("system error")}}),app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)});
