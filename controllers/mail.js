const nodemailer = require('nodemailer')
const mailGen = require('mailgen')
require('dotenv').config()

// const sendMail=async(req,res)=>{

//     const {userMail} = req.body
//     const config = {
//         service: 'gmail',
//         auth: {
//             user: process.env.EMAIL,
//             pass: process.env.PASSWORD
//         }
//     }

//     const transporter = nodemailer.createTransport(config)

//     const mailGenerator = new mailGen({
//         theme: 'default',
//         product: {
//             name: 'Jay Patel',
//             link: 'https://mailgen.js'
//         }
//     })

//     const response = {
//         body: {
//             name: "Jay Patel",
//             intro: "Your OTP is Generated",
//             table: {
//                 data: [{
//                         Data: "One Time OTP",
//                         OTP: "123456"
//                     }]
//             }
//         }
//     }

//     const mail = mailGenerator.generate(response)

//     const message = {
//         from: process.env.EMAIL,
//         to: userMail,
//         subject: 'OTP Generation',
//         html: mail
//     }

//     const send = await transporter.sendMail(message)
//     if(send){
//         return res.status(201).json({msg: "you should recevive an email"})
//     }
//     else return res.status(501).json({error: "something went wrong"})
// }

const config = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
}

const transporter = nodemailer.createTransport(config)

const mailGenerator = new mailGen({
    theme: 'default',
    product: {
        name: 'Vacant bed Search System',
        link: 'https://mailgen.js'
    }
})

const registerMail=async(req,res)=>{
    const {username, email, text, subject} = req.body

    const response = {
        body: {
            name: username,
            intro: text || "Thank you for reaching out to us and for choosing our hospital for your healthcare needs. We're delighted to confirm that we have received your bed reservation request.",
            outro: "Your comfort and well-being are our top priorities, and we assure you that we will do everything possible to ensure a smooth and satisfactory experience during your stay with us."
        }
    }

    const mail = mailGenerator.generate(response)

    const message = {
        from: process.env.EMAIL,
        to: email,
        subject : subject || "Bed booked successfully",
        html: mail
    }

    try {
        const send = await transporter.sendMail(message);
        if (send) {
            return res.status(201).json({ msg: "You should receive an email." });
        }
    } catch (error) {
        // console.error("Error sending email:", error);
        return res.status(501).json({ error: "Something went wrong." });
    }
}
module.exports = {
    registerMail
}