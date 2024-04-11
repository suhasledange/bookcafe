import { conf } from '@/app/util/conf';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'

export async function POST(req) {

    try {
        const {
            subject,
            bookName,
            name,
            email,
            ExtendDate

        } = await req.json();

        const transporter = nodemailer.createTransport({
            host: conf.EMAILHOST,
            port: 587,
            secure: false,
            auth: {
                user: conf.EMAILUSER,
                pass: conf.EMAILPASS
            },
        });

        const info = await transporter.sendMail({
            from: `"BookCafe" <${conf.EMAILUSER}>`,
            to: email,
            subject: subject,
            html: `
        <p>Dear ${name},</p>
        <p>We're delighted to inform you that the rental period for the book "${bookName}" has been successfully extended in your profile. Below are the updated details:</p>
        <table>
        <tr>
            <td><strong>Book Title:</strong></td>
            <td>${bookName}</td>
        </tr>
        <tr>
            <td><strong>New Due Date:</strong></td>
            <td>${ExtendDate}</td>
        </tr>
    </table>
        <p>You now have more time to enjoy your reading without any worries. If you have any further questions or need assistance, feel free to reach out  at <a href="mailto:support@example.com">bookcafe30@gmail.com</a>. We're here to help!</p>
        <p> We hope you continue to have a pleasant reading experience with us.</p>

        <p>Best regards,</p>
        <p><br>BOOKCAFE<br>Contact Information <BR>9389603522 <br>7588535092</p>
        `,
        });

        return NextResponse.json({ message: `Email sent successfully with messageId ${info.messageId}` }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Failed to send" }, { status: 500 })
    }
}