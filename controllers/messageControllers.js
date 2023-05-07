const Messages = require("../model/messageModel");
const { sendMail } = require("../services/sendMail");
const { sendNotification } = require("../services/sendNotification");


module.exports.newmag= async(req,res)=>{
    const {email,name,phonenumber,message,isquotation,materials} =req.body;
    console.log(email,name,phonenumber,message);
    if(email && name && phonenumber ){
        const newmag =await Messages.create({email,name,phonenumber,message,isquotation,materials})
        if(newmag){
            try {
                await sendNotification({
                        app_id: "b78e338f-2dc8-4ded-b596-91ca8729b0f2",
                        contents: {"en": `New ${isquotation ? "Quotation":"Message"} from ${name} ${message}`},
                        heading:{"en":"Stranger"},
                        included_segments: ["All"]
                })
                await sendMail(process.env.userEMAIL,`New ${isquotation ? "Quotation":"Message"} arrival from ${name} `,` <br><br> Custermer Name : ${name} <br>  Custermer Phonenumber : ${phonenumber} <br> <br>${isquotation ? materials:message}.`)

                res.status(200).json({status: true ,msg:"success"})
                
            } catch (error) {
                console.log(error);
            }
        }
        else
        res.status(200).json({status: false ,msg:"something went wrong"})
    }
    else{
        res.status(200).json({status: false ,msg:"Enter Valid Details "})
    }
}
module.exports.allmsg= async(req,res)=>{
    try {
        const messages = await Messages.find({})
        if(messages) 
        res.status(200).json({status: true ,messages:messages})
    } catch (err) {
        res.status(200).json({status: false ,msg:"something went wrong"})
        
    }
}
module.exports.viewmsg= async(req,res)=>{
    const id =req.params.id;
    console.log(id);
    if(id){
        try {
            await Messages.updateOne({_id:id},{
              status:true
            }).then(async()=>{
                console.log("object");
                const message=await Messages.find({})
                res.status(200).json({status: true,message})
            })
          }
        catch (error) {
            console.log(error);
            res.status(200).json({status:false,msg:"something went wrong"})
        }
    }
}
module.exports.deletemsg= async(req,res)=>{
    const id =req.params.id;
    console.log(id);
    if(id){
        try {
            await Messages.findByIdAndDelete(id)
            const message=await Messages.find({})
            res.status(200).json({status: true,message})
          }
        catch (error) {
            console.log(error);
            res.status(200).json({status:false,msg:"something went wrong"})
          }
    }
}
module.exports.deleteAll= async(req,res)=>{
        try {
            await Messages.deleteMany({})
            const message=await Messages.find({})
            res.status(200).json({status: true,message})
        }
        catch (error) {
            console.log(error);
            res.status(200).json({status:false,msg:"something went wrong"})
        }
}