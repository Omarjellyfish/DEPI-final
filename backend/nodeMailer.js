import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const pass = process.env.NODEMAILER_PASS;
const email = process.env.NODEMAILER_EMAIL;

const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail service
  auth: {
    user: process.env.TRAIL_MAIL, // Your Gmail address
    pass: process.env.TRAIL_PASSWORD, // Your Gmail password (use App Password if 2FA is enabled)
  },
});

const confirmEmailAdressTemplate = (name, otp) => `<h1> Confirm your Email </h1>
 ${name}, this is your OTP key please ignore this email if you didn't create this account, OTP : <h2> ${otp}</h2>
`;

const confirmationEmailTemplate = (name, service, datetime) => `
  <h1>Confirmation Email</h1>
  <p>Dear ${name},</p>
  <p>Your booking for the <strong>${service}</strong> service on <strong>${datetime}</strong> has been successfully confirmed.</p>
`;

const cancellationEmailTemplate = (name) => `
  <h1>Cancellation Email</h1>
  <p>Dear ${name},</p>
  <p>We regret to inform you that your booking for the <strong></strong> service has been canceled</strong>.</p>
`;

async function sendEmail(to, subject, htmlContent) {
  try {
    const info = await transporter.sendMail({
      from: `"EasyReserve" <${email}>`,
      to: to,
      subject: subject,
      html: htmlContent,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}

async function sendConfirmationEmail(to, name, service, datetime) {
  console.log("hello from send confirmation email");
  const subject = "Booking Confirmation";
  const htmlContent = confirmationEmailTemplate(name, service, datetime);
  await sendEmail(to, subject, htmlContent);
}

async function sendCancellationEmail(to, name, service, datetime) {
  const subject = "Booking Cancellation";
  const htmlContent = cancellationEmailTemplate(name, service, datetime);
  await sendEmail(to, subject, htmlContent);
}

async function sendOTPEmail(to, name, OTP) {
  const subject = "Confirm your email";
  const htmlContent = confirmEmailAdressTemplate(name, OTP);
  await sendEmail(to, subject, htmlContent);
}
export { sendConfirmationEmail, sendCancellationEmail };
