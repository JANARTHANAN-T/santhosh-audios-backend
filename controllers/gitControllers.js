const repoModel = require("../model/repoModel");

module.exports.addRepo = async (req,res)=>{
    console.log(req.body);
    try {
        const {reponame}= req.body;
        const email= req.body.userdata.email;
        if(email && reponame){
            const repo= await repoModel.create({email,reponame});
            console.log(repo);
            res.status(200).json({ status: true,msg:'repository successfull added'});
        }
        res.status(200).json({status: false,msg : "Repostiry name is required"})

    } catch (error) {
        
    }
}