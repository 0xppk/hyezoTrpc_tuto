import nodemailer from "nodemailer";

interface MailtrapTransporter {
  host: string;
}

export async function sendLoginEmail({
  email,
  url,
  token,
}: {
  email: string;
  url: string;
  token: string;
}) {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    post: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  } as MailtrapTransporter);

  const info = await transporter.sendMail({
    from: '"HyezoPrk" <hyezoprk@example.com>',
    to: email,
    subject: "login to your account",
    html: `Login by clicking <a href="${url}/login#token=${token}">HERE</a>`,
  });

  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
}
