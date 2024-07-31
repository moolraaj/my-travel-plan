import nodemailer from 'nodemailer';

export const SendEmail = async ({ name, email, phone_number, message }) => {
    try {
        console.log('GMAIL_AUTH_EMAIL_ID:', process.env.GMAIL_AUTH_EMAIL_ID);
        console.log('GMAIL_AUTH_PASS:', process.env.GMAIL_AUTH_PASS);
        console.log('Recipient email for user:', email);
        console.log('Recipient email for admin:', "raaj73906@gmail.com");

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_AUTH_EMAIL_ID,
                pass: process.env.GMAIL_AUTH_PASS
            }
        });

        const userMailOptions = {
            from: process.env.GMAIL_AUTH_EMAIL_ID,
            to: email,
            subject: 'Thank you for contacting us',
            html: `<p>Dear ${name},</p>
                   <p>Thank you for reaching out to us. We have received your message:</p>
                   <p>${message}</p>
                   <p>We will get back to you soon.</p>
                   <p>Best regards,<br>Your Company</p>`
        };

        const adminMailOptions = {
            from: process.env.GMAIL_AUTH_EMAIL_ID,
            to: "raaj73906@gmail.com",
            subject: 'New Contact Form Submission',
            html: `<p>New contact form submission received:</p>
                   <p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Phone Number:</strong> ${phone_number}</p>
                   <p><strong>Message:</strong> ${message}</p>`
        };

        const userMailResponse = await transporter.sendMail(userMailOptions);
        const adminMailResponse = await transporter.sendMail(adminMailOptions);

        return { userMailResponse, adminMailResponse };
    } catch (error) {
        console.error('Error sending emails:', error.message);
        throw new Error('Error sending emails: ' + error.message);
    }
};
