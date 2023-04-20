const nodemailer = require('nodemailer');

module.exports.sendMail= async (to,sub,message)=>{
    
    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.userEMAIL,
            pass: process.env.userPASS
        }
    });
    let info = await mailTransporter.sendMail({
    from: process.env.userEMAIL,
    to: to, // list of receivers
    subject: sub, // Subject line
    text: message, // plain text body
    html:`<b>${message},<b>`, // html body
    });
}






