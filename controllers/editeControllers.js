
const jsonfile = require('jsonfile')
const file = './codestack/Santhosh-audios-frontend/data.json'

module.exports.getdata = async (req,res)=>{
    // res.send('get data')
    jsonfile.readFile(file, function (err, obj) {
        if (err) {
            console.log(err);
            res.send({'status':false,'msg':err})
        }
        res.send({'status':true,'object':obj})
    })

}
module.exports.savedata = async (req,res)=>{
    // res.send('save data')
    jsonfile.writeFile(file,req.body,function(err,obj){
        if (err) {
            console.log(err);
            res.send({'status':false,'msg':err})
        }
        res.send({'status':true,'object':obj})
    })
}