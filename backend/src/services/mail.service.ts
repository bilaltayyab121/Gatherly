// import nodemailer from "nodemailer";
// import AppError from "../utils/appError";

// interface MailOptions {
//   email: string;
//   subject: string;
//   text: string;
//   html?: string;
// }

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: Number(process.env.EMAIL_PORT),
//   auth: {
//     user: process.env.EMAIL_USERNAME,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// export const sendEmail = async (options: MailOptions) => {
//   try {
//     const mailOptions = {
//       from: "Event Management <no-reply@eventmanagement.com>",
//       to: options.email,
//       subject: options.subject,
//       text: options.text,
//       html: options.html,
//     };

//     await transporter.sendMail(mailOptions);
//   } catch (err) {
//     console.error("Error sending email:", err);
//     throw new AppError(
//       "There was an error sending the email. Try again later!",
//       500
//     );
//   }
// };

// services/mail.service.ts
import nodemailer from "nodemailer";

interface EmailOptions {
  email: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendEmail = async (options: EmailOptions) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.email,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    // Send email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email could not be sent");
  }
};
