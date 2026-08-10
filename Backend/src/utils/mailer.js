import nodemailer from "nodemailer";
import { BUSINESS_EMAIL, BUSINESS_EMAIL_PASSWORD } from "../config/config.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: BUSINESS_EMAIL,
        pass: BUSINESS_EMAIL_PASSWORD,
    },
});

export default async function sendMail(to, subject, body) {
    return transporter.sendMail({
        from: `"Comic-Tube" <${BUSINESS_EMAIL}>`,
        to,
        subject,
        html: body,
    });
}