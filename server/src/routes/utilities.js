const express = require("express");
const nodemailer = require("nodemailer");
const htmlToText = require('nodemailer-html-to-text').htmlToText;
 
// utilityRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /utilities.
const utilityRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const smtpAddress = "smtp.gmail.com";
const portNumber = 587;
const enableSSL = true;
const emailFromAddress = "DinamoTeam20@gmail.com";

utilityRoutes.route("/api/Utilities/SendEmail").post(async function (req, res) {
  let emailBody = "";
  emailBody += `<p>Name: ${req.body.Name}</p>`;
  emailBody += `<p>Email: ${req.body.Email}</p>`;
  emailBody += `<p>Subject: ${req.body.Subject}</p>`;
  emailBody += `<p>Message: </p>`;
  emailBody += `<p>${req.body.Message}</p>`;
    
  await SendEmail(emailBody);

  res.json({ response: "Email sent sucessful!" });
});

utilityRoutes.route("/api/Utilities/SendFeedbackForm").post(async function (req, res) {
  let emailBody = "";
  emailBody += "<p>Your overall satisfaction of the app: " + req.body.SatisfactionLevel + "</p>";
  emailBody += "<p>How satisfied are you with the ability to collaborate with others using this app? " + req.body.CollabLevel + "</p>";
  emailBody += "<p>What do you like most about the app? " + req.body.DidWell + "</p>";
  emailBody += "<p>Which of the issues below was the biggest problem during your experience? " + req.body.Issue + "</p>";
  emailBody += "<p>Please describe the problem you encountered in more detail: " + req.body.IssueDetails + "</p>";
  emailBody += "<p>Do you have any suggestions for improvement? " + req.body.Improvement + "</p>";
    
  await SendEmail(emailBody);

  res.json({ response: "Email sent sucessful!" });
});

async function SendEmail(emailBody) {
  let password = process.env.EmailPassword;

  let transporter = nodemailer.createTransport({
    host: smtpAddress,
    port: portNumber,
    secure: false, // true for 465, false for other ports
    auth: {
      user: emailFromAddress,
      pass: password,
    },
  });
  transporter.use('compile', htmlToText());

  try {
    let info = await transporter.sendMail({
      from: emailFromAddress,
      to: "gtt27@drexel.edu, atran33@mylangara.ca", // list of receivers
      subject: "Message from Code Spot", // Subject line
      html: emailBody,
    });
  
    console.log("Message sent: %s", info.messageId);
  } catch(ex) {
    console.log(`Error: ${ex}`);
  }
}

module.exports = utilityRoutes;
