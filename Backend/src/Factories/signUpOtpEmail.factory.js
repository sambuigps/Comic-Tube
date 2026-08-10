import { body } from "express-validator";
import { App_NAME } from "../constants.js";
export default function signUpOtpEmail(otp, username) {
    return {
        subject: `Welcome to ${App_NAME}`,
        body: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Verify your ${App_NAME} account</title>
        </head>

        <body style="
            margin: 0;
            padding: 0;
            background-color: #f4f4f5;
            font-family: Arial, Helvetica, sans-serif;
            color: #18181b;
        ">
            <div style="
                max-width: 600px;
                margin: 40px auto;
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                border: 1px solid #e4e4e7;
            ">

                <!-- Header -->
                <div style="
                    padding: 28px 32px;
                    background-color: #18181b;
                    text-align: center;
                ">
                    <h1 style="
                        margin: 0;
                        color: #ffffff;
                        font-size: 28px;
                    ">
                        ${App_NAME}
                    </h1>
                </div>

                <!-- Content -->
                <div style="padding: 40px 32px;">

                    <h2 style="
                        margin: 0 0 16px;
                        font-size: 24px;
                    ">
                        Welcome, ${username}! 👋
                    </h2>

                    <p style="
                        margin: 0 0 20px;
                        font-size: 16px;
                        line-height: 1.6;
                        color: #52525b;
                    ">
                        Thanks for signing up for <strong>${App_NAME}</strong>!
                        We're excited to have you join our community of comic
                        readers.
                    </p>

                    <p style="
                        margin: 0 0 12px;
                        font-size: 16px;
                        line-height: 1.6;
                        color: #52525b;
                    ">
                        Use the verification code below to complete your
                        registration:
                    </p>

                    <!-- OTP -->
                    <div style="
                        margin: 28px 0;
                        padding: 20px;
                        background-color: #f4f4f5;
                        border-radius: 8px;
                        text-align: center;
                    ">
                        <span style="
                            font-size: 32px;
                            font-weight: bold;
                            letter-spacing: 8px;
                            color: #18181b;
                        ">
                            ${otp}
                        </span>
                    </div>

                    <p style="
                        margin: 0 0 12px;
                        font-size: 14px;
                        line-height: 1.6;
                        color: #71717a;
                        text-align: center;
                    ">
                        This code will expire soon. Please don't share it
                        with anyone.
                    </p>

                    <hr style="
                        border: none;
                        border-top: 1px solid #e4e4e7;
                        margin: 32px 0;
                    ">

                    <p style="
                        margin: 0;
                        font-size: 14px;
                        line-height: 1.6;
                        color: #71717a;
                    ">
                        If you didn't create a ${App_NAME} account, you can
                        safely ignore this email.
                    </p>

                </div>

                <!-- Footer -->
                <div style="
                    padding: 20px 32px;
                    background-color: #fafafa;
                    text-align: center;
                ">
                    <p style="
                        margin: 0;
                        font-size: 13px;
                        color: #a1a1aa;
                    ">
                        © ${new Date().getFullYear()} ${App_NAME}. All rights reserved.
                    </p>
                </div>

            </div>
        </body>
        </html>
    `}
}