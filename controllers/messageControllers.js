const messageModel = require('../model/repoModel');


module.exports.newmag= async(req,res)=>{
    res.send('new mag')
}
module.exports.allmsg= async(req,res)=>{
    res.send('All msg')
}
module.exports.viewmsg= async(req,res)=>{
    res.send('View msg')
}