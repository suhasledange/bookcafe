import { conf } from '@/app/util/conf';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'

export async function POST(req){

    try {
        const {
            subject,
            email,
            orderId,
            bookName,
            author,
            address,
            name,
            orderDate,
            Payment
            
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
        <p>We're thrilled to inform you that your recent order with our bookCafe  has been successfully processed. Below, you'll find the details of your order:</p>
        <table>
            <tr>
                <td><strong>Order Number:</strong></td>
                <td>${orderId}</td>
            </tr>
            <tr>
                <td><strong>Book Title:</strong></td>
                <td>${bookName}</td>
            </tr>
            <tr>
                <td><strong>Author:</strong></td>
                <td>${author}</td>
            </tr>
            <tr>
                <td><strong>Order Date:</strong></td>
                <td>${orderDate}</td>
            </tr>
            <tr>
                <td><strong>Delivery Address:</strong></td>
                <td>${address}</td>
            </tr>
            <tr>
            <td><strong>Payment Method:</strong></td>
            <td>${Payment}</td>
        </tr>
        </table>

        <p>If you have any questions or concerns regarding your order, feel free to reply to this email  <a href="mailto:bookcafe30@gmail.com">bookcafe30@gmail</a>. We're here to assist you every step of the way.</p>
        <p> Thank you for your order!</p>
        <p>Warm regards,</p>
        <p><br>BOOKCAFE<br>Contact Information <BR>9389603522 <br>7588535092</p>
        `,
      });

    return NextResponse.json({message:`Email sent successfully with messageId ${info.messageId}`},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Failed to send"},{status:500})
    }
}