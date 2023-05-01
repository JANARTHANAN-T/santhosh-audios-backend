
const jsonfile = require('jsonfile')
const file = './codestack/React-Testing/src/data.json'
const Fs = require('fs')  
const { checkRepo } = require('../services/chickRepo')


module.exports.getdata = async (req,res)=>{
    await checkRepo()
    if(Fs.existsSync(file)){   
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
    await checkRepo()
    // res.send('savedata')
    jsonfile.writeFile(file,req.body,function(err,obj){
        if (err) {
            console.log(err);
            res.send({'status':false,'msg':err})
        }
        res.send({'status':true,'object':obj})
    })
}