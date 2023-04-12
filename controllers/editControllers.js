
const jsonfile = require('jsonfile')
const file = './codestack/data.json'
const Fs = require('fs')  


module.exports.getdata = async (req,res)=>{
    if(Fs.existsSync('./codestack/data.json')){   
        jsonfile.readFile(file, function (err, obj) {
            if (err) {
                // console.log(err);
                res.send({'status':false,'msg':err})
            }
            console.log('getdata');
            res.send({'status':true,'object':obj})
        })
    }
    else
    res.send({'status':false,'msg':'no page found'})
}
module.exports.savedata = async (req,res)=>{
    // res.send('savedata')
    jsonfile.writeFile(file,req.body,function(err,obj){
        if (err) {
            console.log(err);
            res.send({'status':false,'msg':err})
        }
        res.send({'status':true,'object':obj})
    })
}