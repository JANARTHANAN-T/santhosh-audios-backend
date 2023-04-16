const Messages = require("../model/messageModel");


module.exports.newmag= async(req,res)=>{
    const {email,name,phonenumber,message} =req.body;
    console.log(email,name,phonenumber,message);
    if(email && name && phonenumber && message){
        const newmag =await Messages.create({email,name,phonenumber,message})
        if(newmag) 
        res.status(200).json({status: true ,msg:"success"})
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