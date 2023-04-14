const Messages = require("../model/messageModel");


module.exports.newmag= async(req,res)=>{
    const {email,name,phonenumber,message} =req.body;
    console.log(email,name,phonenumber,message);
    if(email && name && phonenumber && message){
        // console.log("hi");
        const newmag =await Messages.create({email,name,phonenumber,message})
        if(newmag) 
        res.status(200).json({status: true ,meg:"success"})
        else
        res.status(200).json({status: false ,meg:"something went wrong"})
    }
    else{
        res.status(200).json({status: false ,meg:"Enter Valid Details "})
    }
}
module.exports.allmsg= async(req,res)=>{
    try {
        const messages = await Messages.find({})
        if(messages) 
        res.status(200).json({status: true ,messages:messages})
    } catch (err) {
        res.status(200).json({status: false ,meg:"something went wrong"})
        
    }
}
module.exports.viewmsg= async(req,res)=>{
    const id =req.params.id;
    console.log(id);
    if(id){
        try {
            await Messages.updateOne({_id:id},{
              status:true
            }).then(()=>{
                res.status(200).json({status: true ,msg:"Success"})
            })
          }
        catch (error) {
            console.log(error);
            res.status(200).json({status:false,msg:"something went wrong"})
          }
    }
}