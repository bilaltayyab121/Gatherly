import nodemailer from "nodemailer";
import AppError from "../utils/appError";

interface MailOptions {
  email: string;
  subject: string;
  text: string;
  html?: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async (options: MailOptions) => {
  try {
    const mailOptions = {
      from: "Event Management <no-reply@eventmanagement.com>",
      to: options.email,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Error sending email:", err);
    throw new AppError(
      "There was an error sending the email. Try again later!",
      500
    );
  }
};
