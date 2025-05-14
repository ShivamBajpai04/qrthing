import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendScanNotification(
  url: string,
  to: string,
  location?: string
) {
  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to,
      subject: "QR Code Scanned!",
      html: `
        <h3>Your QR code was just scanned</h3>
        <p><strong>URL:</strong> ${url}</p>
        ${location ? `<p><strong>Location:</strong> ${location}</p>` : ""}
        <p>Time: ${new Date().toLocaleString()}</p>
      `,
    });
  } catch (err) {
    console.error("Email error:", err);
  }
}
