import { createTransport } from "nodemailer";

const sendMail = async (email, subject, text) =>{
    //config
    const transport = createTransport({
        // This is commom if we use gmail smtp
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.GMAIL,
            pass: process.env.GPASS,
        }
    })

    //Send Mail

    await transport.sendMail({
        sender: "Devil Cart",
        from: process.env.GMAIL,
        to: email,
        subject,
        text,
    })
}

export default sendMail;