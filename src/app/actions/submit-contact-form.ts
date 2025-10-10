"use server";

import { Resend } from "resend";
import { addToGoogleSheets, getCurrentTimestamp, type ContactFormData } from "@/lib/google-sheets";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(data: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return {
        success: false,
        message: "Please fill in all required fields."
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        message: "Please enter a valid email address."
      };
    }

    // Send email using Resend
    if (process.env.RESEND_API_KEY) {
      const emailContent = createContactEmailContent(data);
      
      const emailResult = await resend.emails.send({
        from: "Contact Form <noreply@unwinddesigns.com.au>",
        to: ["jxmstudioweb@gmail.com"],
        subject: `New Contact Form from ${data.name}`,
        html: emailContent,
        replyTo: data.email,
      });

      if (emailResult.error) {
        console.error("Email send error:", emailResult.error);
      }
    }

    // Save to Google Sheets
    const sheetsData: ContactFormData = {
      name: data.name,
      email: data.email,
      message: data.message,
      submissionDate: getCurrentTimestamp(),
      source: 'contact-form'
    };

    const sheetsResult = await addToGoogleSheets(sheetsData);
    if (!sheetsResult.success) {
      console.error("Google Sheets error:", sheetsResult.message);
      // Don't fail the entire request if Sheets fails
    }

    return { success: true, message: "Message sent successfully! We'll get back to you soon." };
    
  } catch (error) {
    console.error("Submit contact form error:", error);
    return { 
      success: false, 
      message: "Failed to send message. Please try again." 
    };
  }
}

function createContactEmailContent(data: {
  name: string;
  email: string;
  message: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #8B4513; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .section { margin-bottom: 20px; }
        .label { font-weight: bold; color: #8B4513; }
        .value { margin-left: 10px; }
        .message-box { background: #fff; padding: 15px; border-left: 4px solid #8B4513; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 New Contact Form Submission</h1>
        </div>
        <div class="content">
          <div class="section">
            <h2>Contact Information</h2>
            <p><span class="label">Name:</span><span class="value">${data.name}</span></p>
            <p><span class="label">Email:</span><span class="value">${data.email}</span></p>
          </div>
          
          <div class="section">
            <h2>Message</h2>
            <div class="message-box">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>

          <div class="section">
            <p><small>Submitted on ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' })}</small></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
