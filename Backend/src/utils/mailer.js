// utils/mailer.js

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.BUSINESS_EMAIL,
        pass: process.env.BUSINESS_EMAIL_PASSWORD,
    },
});

export async function sendMail(to, subject, body) {
    return transporter.sendMail({
        from: `"Comic-Tube" <${process.env.BUSINESS_EMAIL}>`,
        to,
        subject,
        html: body,
    });
}